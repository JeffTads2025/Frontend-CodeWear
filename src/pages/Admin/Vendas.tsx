import { useEffect, useState } from 'react';
import {
  FiCalendar,
  FiDownload,
  FiShoppingBag
} from 'react-icons/fi';
import api from '../../services/api';
import { ButtonV2 } from '../../components/ButtonV2';
import { InfoCard } from '../../components/InfoCard';
import { InputV2 } from '../../components/InputV2';
import { Pagination } from '../../components/Pagination';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import * as S from './styles';

export function AdminVendas() {
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    monthlyRevenue: 0
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // CORREÇÃO: Garante que o estado inicial seja SEMPRE a data de hoje no fuso local
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().split('T')[0];
  });

  async function loadVendas() {
    try {
      // Divide a data (ex: 2024-03-29) para mandar pro Back-end
      const [year, month] = selectedDate.split('-');

      const [ordersRes, statsRes] = await Promise.all([
        // Busca as vendas do dia específico (Hoje por padrão)
        api.get(`/admin/all-orders?page=${page}&date=${selectedDate}`),
        // Busca os totais do mês e geral
        api.get(`/admin/dashboard?month=${month}&year=${year}`)
      ]);

      setOrders(ordersRes.data.orders || []);
      setTotalPages(ordersRes.data.totalPages || 1);

      setStats({
        totalRevenue: Number(statsRes.data?.totalRevenue || 0),
        monthlyRevenue: Number(statsRes.data?.monthlyRevenue || 0)
      });

    } catch (err) {
      console.error("Erro ao carregar vendas", err);
    }
  }

  // Monitora a data e a página. Mudou a data? Recarrega tudo.
  useEffect(() => {
    loadVendas();
  }, [page, selectedDate]);

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(value) || 0);
  };

  const formatSelectedDate = (date: string) => {
    if (!date) return '';

    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleExportExcel = async (mode: 'day' | 'month') => {
    try {
      let exportData = [];
      const [year, month] = selectedDate.split('-');

      if (mode === 'day') {
        exportData = orders;
      } else {
        const res = await api.get(`/admin/all-orders?month=${month}&year=${year}&limit=9999`);
        exportData = res.data.orders || [];
      }

      if (exportData.length === 0) {
        toast.warn('Sem vendas para exportar.');
        return;
      }

      const rows = exportData.map((o: any) => ({
        'Cliente': o.User?.name || 'N/A',
        'Endereço': o.address || 'N/A',
        'Produtos': o.OrderItems?.map((i: any) => `${i.quantity}x ${i.Product?.name}`).join(', '),
        'Data': new Date(o.createdAt).toLocaleDateString('pt-BR'),
        'Total (R$)': Number(o.totalValue || 0).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      }));

      const totalSoma = exportData.reduce((acc: number, curr: any) => acc + Number(curr.totalValue || 0), 0);
      rows.push({
        'Cliente': '---', 'Endereço': '---', 'Produtos': '---',
        'Data': 'SOMA TOTAL:',
        'Total (R$)': totalSoma.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
      });

      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Vendas");
      XLSX.writeFile(wb, `Relatorio_${mode === 'day' ? 'Dia' : 'Mes'}.xlsx`);
    } catch (err) {
      alert("Erro no Excel.");
    }
  };

  return (
    <S.Container>
      <S.TopBar>
        <S.TitleGroup>
          <h2>
            <FiShoppingBag color="#00ff88" /> Relatório de Vendas e Entregas
            <S.PageBadge>{formatSelectedDate(selectedDate)}</S.PageBadge>
          </h2>
        </S.TitleGroup>

        <S.ControlsGroup>
          <ButtonV2
            label="Exportar Dia"
            icon={<FiDownload size={16} />}
            onClick={() => handleExportExcel('day')}
          />
          <ButtonV2
            label="Exportar Mês"
            icon={<FiDownload size={16} />}
            variant="neutral"
            onClick={() => handleExportExcel('month')}
          />
          <S.ControlField $width="190px">
            <InputV2
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              icon={<FiCalendar size={16} />}
              fullWidth
            />
          </S.ControlField>
        </S.ControlsGroup>
      </S.TopBar>

      <S.MetricsRow>
        <S.MetricCard>
          <span>FATURAMENTO GERAL</span>
          <h2>{formatCurrency(stats.totalRevenue)}</h2>
        </S.MetricCard>

        <S.MetricCard>
          <span>VENDAS NO MÊS</span>
          <h2>{formatCurrency(stats.monthlyRevenue)}</h2>
        </S.MetricCard>

        <S.MetricCard>
          <span>FATURAMENTO DO DIA</span>
          <h2>
            {formatCurrency(orders.reduce((acc, o) => acc + Number(o.totalValue), 0))}
          </h2>
        </S.MetricCard>
      </S.MetricsRow>

      <S.AuditTable>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Endereço de Entrega</th>
            <th>Produtos</th>
            <th>Total</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map(order => (
              <tr key={order.id}>
                <td>
                  <InfoCard value={order.User?.name || 'N/A'} />
                </td>
                <td>
                  <InfoCard value={order.address || 'N/A'} />
                </td>
                <td>
                  <InfoCard
                    value={order.OrderItems?.map((i: any) => `${i.quantity}x ${i.Product?.name}`).join(', ') || 'N/A'}
                  />
                </td>
                <td><strong>{formatCurrency(order.totalValue)}</strong></td>
                <td>{new Date(order.createdAt).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>Sem vendas registradas hoje.</td></tr>
          )}
        </tbody>
      </S.AuditTable>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </S.Container>
  );
}