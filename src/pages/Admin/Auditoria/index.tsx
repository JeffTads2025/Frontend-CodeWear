import { useEffect, useState } from 'react';
import { FiActivity, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../../services/api';
import * as S from '../styles';

export function AdminAuditoria() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    async function loadLogs(page = 1) {
        try {
            setLoading(true);
            // Enviamos exatamente o que o Back-end espera
            const response = await api.get(`/admin/logs?page=${page}&limit=5&search=${searchTerm}`);
            
            // Tratamos a resposta para não quebrar o .map
            setLogs(response.data.logs || []);
            setTotalPages(response.data.totalPages || 1);
            setCurrentPage(page);
        } catch (err) {
            console.error("Erro ao carregar auditoria");
        } finally {
            setLoading(false);
        }
    }

    // Debounce na busca: espera o usuário parar de digitar para carregar
    useEffect(() => {
        const timer = setTimeout(() => loadLogs(1), 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    return (
        <S.Container>
            <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2><FiActivity /> Auditoria do Sistema</h2>
                <div style={{ position: 'relative' }}>
                    <input
                        placeholder="Pesquisar..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{ padding: '8px 12px 8px 35px', borderRadius: '4px', border: '1px solid #333', background: '#111', color: '#fff' }}
                    />
                    <FiSearch style={{ position: 'absolute', left: '10px', top: '12px', color: '#666' }} />
                </div>
            </header>

            {loading ? <p>Carregando...</p> : (
                <S.AuditTable>
                    <thead>
                        <tr>
                            <th>Usuário</th>
                            <th>Ação</th>
                            <th>Detalhes</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map(log => (
                            <tr key={log.id}>
                                <td><strong>{log.adminName || 'Sistema'}</strong></td>
                                <td><span style={{ color: 'var(--primary)' }}>{log.action}</span></td>
                                <td style={{ fontSize: '0.85rem', color: '#999' }}>{log.details}</td>
                                <td>{new Date(log.createdAt).toLocaleString('pt-BR')}</td>
                            </tr>
                        ))}
                    </tbody>
                </S.AuditTable>
            )}

            <S.Pagination style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px' }}>
                <button onClick={() => loadLogs(currentPage - 1)} disabled={currentPage === 1 || loading}>
                    <FiChevronLeft />
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button onClick={() => loadLogs(currentPage + 1)} disabled={currentPage === totalPages || loading}>
                    <FiChevronRight />
                </button>
            </S.Pagination>
        </S.Container>
    );
}