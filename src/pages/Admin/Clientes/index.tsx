import { useEffect, useState, useCallback } from 'react';
import { FiUsers, FiChevronLeft, FiChevronRight, FiSearch, FiDownload } from 'react-icons/fi';
import api from '../../../services/api'; 
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
      <header style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FiUsers color="#00ff88" /> Gestão de Clientes
          
          <span style={{ 
            fontSize: '0.8rem', background: '#00ff8822', color: '#00ff88', 
            padding: '4px 12px', borderRadius: '20px', border: '1px solid #00ff8844' 
          }}>
            {totalItems} clientes totais
          </span>
        </h2>

        <div style={{ display: 'flex', gap: '10px' }}>
          {/* Botão Exportar Tudo - Visual discreto com borda verde */}
          <button 
            onClick={exportAllToCSV} 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              background: '#161616', border: '1px solid #00ff88', 
              color: '#fff', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer' 
            }}
          >
            <FiDownload size={16} color="#00ff88" /> Exportar Tudo
          </button>

          {/* Botão Página - Visual padrão */}
          <button 
            onClick={exportCurrentPageToCSV} 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              background: '#161616', border: '1px solid #333', 
              color: '#fff', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer' 
            }}
          >
            <FiDownload size={16} color="#888" /> Página
          </button>

          <div style={{ 
            display: 'flex', alignItems: 'center', gap: '10px', 
            background: '#161616', padding: '8px 15px', borderRadius: '8px', 
            border: '1px solid #333', width: '250px' 
          }}>
            <FiSearch size={18} color="#888" />
            <input 
              type="text" 
              placeholder="Pesquisar..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%' }} 
            />
          </div>
        </div>
      </header>

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
                <td style={{ fontWeight: 'bold', color: '#fff' }}>{user.name}</td>
                <td>{user.cpf || '---'}</td>
                <td>{user.email}</td>
                <td style={{ color: '#00ff88' }}>{user.phone || '---'}</td>
                <td style={{ maxWidth: '200px', fontSize: '0.8rem' }}>{user.address || '---'}</td>
                <td>{new Date(user.createdAt).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#666' }}>Nenhum cliente encontrado.</td></tr>
          )}
        </tbody>
      </S.Table>

      <S.Pagination style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px' }}>
        <button 
          onClick={() => loadUsers(currentPage - 1, search)} 
          disabled={currentPage === 1 || loading}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
        > 
          <FiChevronLeft size={24} /> 
        </button>
        <span style={{ color: '#888' }}>Página <strong style={{ color: '#00ff88' }}>{currentPage}</strong> de {totalPages}</span>
        <button 
          onClick={() => loadUsers(currentPage + 1, search)} 
          disabled={currentPage === totalPages || loading}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
        > 
          <FiChevronRight size={24} /> 
        </button>
      </S.Pagination>
    </S.Container>
  );
}