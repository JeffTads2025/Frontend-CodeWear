import { useEffect, useState, useCallback } from 'react';
import { FiUsers, FiSearch, FiDownload } from 'react-icons/fi';
import api from '../../../services/api';
import { Pagination } from '../../../components/Pagination';
import { ButtonV2 } from '../../../components/ButtonV2';
import { InfoCard } from '../../../components/InfoCard';
import { InputV2 } from '../../../components/InputV2';
import * as S from '../styles';
import { toast } from 'react-toastify';

export function AdminClientes() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState('');

  const loadUsers = useCallback(async (page = 1, searchTerm = '') => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/users?page=${page}&limit=5&search=${searchTerm}`);

      const data = response.data.users || [];
      const totalReal = response.data.totalCount || response.data.count || 0;

      setUsers(data);
      setTotalPages(response.data.totalPages || 1);
      setTotalItems(totalReal);
      setCurrentPage(page);
    } catch (err) {
      console.error("Erro ao carregar clientes:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => { loadUsers(1, search); }, 500);
    return () => clearTimeout(handler);
  }, [search, loadUsers]);

  // FUNÇÃO PARA EXPORTAR TODOS OS CLIENTES (RELATÓRIO GERAL)
  const exportAllToCSV = async () => {
    const toastId = toast.loading("Buscando todos os registros no banco...");

    try {
      // Faz uma chamada pedindo um limite alto para pegar todos os clientes de uma vez
      const response = await api.get(`/admin/users?limit=9999`);
      const allUsers = response.data.users || [];

      if (allUsers.length === 0) {
        toast.update(toastId, { render: "Nenhum cliente encontrado para exportar.", type: "error", isLoading: false, autoClose: 3000 });
        return;
      }

      const sep = " ; ";
      const header = `NOME${" ".repeat(20)}${sep}CPF${" ".repeat(15)}${sep}EMAIL${" ".repeat(25)}${sep}TELEFONE${sep}CADASTRO\n`;

      const rows = allUsers.map((u: any) => {
        const nome = (u.name || "").toUpperCase().padEnd(25, ' ');
        const cpf = (u.cpf || "---").padEnd(18, ' ');
        const email = (u.email || "").padEnd(30, ' ');
        const fone = (u.phone || "---").padEnd(15, ' ');
        const data = new Date(u.createdAt).toLocaleDateString('pt-BR');

        return `${nome}${sep}${cpf}${sep}${email}${sep}${fone}${sep}${data}`;
      }).join("\n");

      const blob = new Blob(["\ufeff" + header + rows], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", `RELATORIO_GERAL_CLIENTES.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Atualiza o toast existente para sucesso
      toast.update(toastId, { render: "Relatório Geral baixado!", type: "success", isLoading: false, autoClose: 3000 });

    } catch (err) {
      toast.update(toastId, { render: "Erro ao gerar relatório.", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  // FUNÇÃO PARA EXPORTAR APENAS A PÁGINA ATUAL
  const exportCurrentPageToCSV = () => {
    const sep = " ; ";
    const header = `NOME${" ".repeat(15)}${sep}CPF${" ".repeat(10)}${sep}EMAIL${" ".repeat(20)}${sep}CONTATO\n`;

    const rows = users.map(u => {
      return `${(u.name || "").padEnd(20, ' ')}${sep}${(u.cpf || "").padEnd(15, ' ')}${sep}${(u.email || "").padEnd(25, ' ')}${sep}${(u.phone || "")}`;
    }).join("\n");

    const blob = new Blob(["\ufeff" + header + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `clientes_pagina_${currentPage}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Página exportada com sucesso!");
  };

  return (
    <S.Container>
      <S.TopBar>
        <S.TitleGroup>
          <h2>
            <FiUsers color="#00ff88" /> Gestão de Clientes
            <S.PageBadge>{totalItems} clientes totais</S.PageBadge>
          </h2>
        </S.TitleGroup>

        <S.ControlsGroup>
          <ButtonV2
            label="Exportar Tudo"
            icon={<FiDownload size={16} />}
            onClick={exportAllToCSV}
          />
          <ButtonV2
            label="Página"
            icon={<FiDownload size={16} />}
            variant="neutral"
            onClick={exportCurrentPageToCSV}
          />
          <S.ControlField $width="250px">
            <InputV2
              type="text"
              placeholder="Pesquisar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<FiSearch size={18} />}
              fullWidth
            />
          </S.ControlField>
        </S.ControlsGroup>
      </S.TopBar>

      <S.Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>E-mail</th>
            <th>Contato</th>
            <th>Endereço</th>
            <th>Cadastro</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#888' }}>Carregando dados...</td></tr>
          ) : users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <InfoCard value={user.name || '---'} />
                </td>
                <td>
                  <InfoCard value={user.cpf || '---'} />
                </td>
                <td>
                  <InfoCard value={user.email || '---'} />
                </td>
                <td>
                  <InfoCard value={user.phone || '---'} />
                </td>
                <td>
                  <InfoCard value={user.address || '---'} />
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#666' }}>Nenhum cliente encontrado.</td></tr>
          )}
        </tbody>
      </S.Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
          loadUsers(page, search);
        }}
      />
    </S.Container>
  );
}