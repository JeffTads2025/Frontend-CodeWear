import { useEffect, useState, useMemo } from 'react';
import { 
  FiShoppingBag, 
  FiChevronLeft, 
  FiChevronRight, 
  FiDollarSign, 
  FiCalendar, 
  FiTrendingUp, 
  FiDownload 
} from 'react-icons/fi';
import api from '../../services/api';
import * as XLSX from 'xlsx'; 
import * as S from './styles'; 

export function AdminVendas() {
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({ 
    totalRevenue: 0, 
    monthlyRevenue: 0 
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // CORREÇÃO: Garante que o estado inicial seja SEMPRE a data de hoje no fuso local
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().split('T')[0];
  });

  async function loadVendas() {
    setLoading(true);
    try {
      // Divide a data (ex: 2024-03-29) para mandar pro Back-end
      const [year, month, day] = selectedDate.split('-');

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
    } finally {
      setLoading(false);
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

      if (exportData.length === 0) return alert("Sem vendas para exportar.");

      const rows = exportData.map(o => ({
        'Cliente': o.User?.name || 'N/A',
        'Endereço': o.address || 'N/A',
        'Produtos': o.OrderItems?.map((i: any) => `${i.quantity}x ${i.Product?.name}`).join(', '),
        'Data': new Date(o.createdAt).toLocaleDateString('pt-BR'),
        'Total (R$)': Number(o.totalValue || 0).toLocaleString('pt-BR', { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 2 
        })
      }));

      const totalSoma = exportData.reduce((acc, curr) => acc + Number(curr.totalValue || 0), 0);
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
      <S.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <FiShoppingBag size={24} color="#ffcc00" />
          <h2 style={{ margin: 0 }}>Relatório de Vendas e Entregas</h2>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => handleExportExcel('day')} style={{ background: '#161616', color: '#fff', border: '1px solid #333', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>
            Exportar Dia
          </button>
          <button onClick={() => handleExportExcel('month')} style={{ background: '#161616', color: '#fff', border: '1px solid #333', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>
            Exportar Mês
          </button>
          {/* O calendário já inicia marcado no dia de hoje */}
          <input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)} 
            style={{ background: '#161616', border: '1px solid #333', color: '#fff', padding: '8px', borderRadius: '8px', colorScheme: 'dark' }} 
          />
        </div>
      </S.Header>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', marginTop: '10px' }}>
        <div style={{ background: '#161616', padding: '20px', borderRadius: '12px', flex: 1, border: '1px solid #333' }}>
          <span style={{ color: '#888', fontSize: '0.7rem', fontWeight: 'bold' }}>FATURAMENTO GERAL</span>
          <h2 style={{ color: '#fff', fontSize: '1.5rem', margin: '5px 0 0 0' }}>{formatCurrency(stats.totalRevenue)}</h2>
        </div>

        <div style={{ background: '#161616', padding: '20px', borderRadius: '12px', flex: 1, border: '1px solid #333' }}>
          <span style={{ color: '#888', fontSize: '0.7rem', fontWeight: 'bold' }}>VENDAS NO MÊS</span>
          <h2 style={{ color: '#fff', fontSize: '1.5rem', margin: '5px 0 0 0' }}>{formatCurrency(stats.monthlyRevenue)}</h2>
        </div>

        <div style={{ background: '#161616', padding: '20px', borderRadius: '12px', flex: 1, border: '1px solid #333' }}>
          <span style={{ color: '#888', fontSize: '0.7rem', fontWeight: 'bold' }}>FATURAMENTO DO DIA</span>
          <h2 style={{ color: '#fff', fontSize: '1.5rem', margin: '5px 0 0 0' }}>
            {formatCurrency(orders.reduce((acc, o) => acc + Number(o.totalValue), 0))}
          </h2>
        </div>
      </div>

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
                <td><strong>{order.User?.name}</strong></td>
                <td>{order.address}</td>
                <td>{order.OrderItems?.map((i: any) => `${i.quantity}x ${i.Product?.name}`).join(', ')}</td>
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
        <S.Pagination>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>Anterior</button>
          <span>{page} / {totalPages}</span>
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Próxima</button>
        </S.Pagination>
      )}
    </S.Container>
  );
}