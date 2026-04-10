import { useEffect, useState } from 'react';
import { FiActivity, FiSearch } from 'react-icons/fi';
import { InfoCard } from '../../../components/InfoCard';
import { InputV2 } from '../../../components/InputV2';
import { auditApi } from '../../../services/api';
import { Pagination } from '../../../components/Pagination';
import * as S from '../styles';

export function AdminAuditoria() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Função para traduzir ações para português
    const translateAction = (action: string) => {
        switch (action) {
            case 'CREATE_PRODUCT':
                return 'Criou produto';
            case 'UPDATE_PRODUCT':
                return 'Atualizou produto';
            case 'DELETE_PRODUCT':
                return 'Deletou produto';
            default:
                return action;
        }
    };

    async function loadLogs(page = 1) {
        try {
            setLoading(true);
            // Enviamos exatamente o que o Back-end espera
            const response = await auditApi.getLogs({ page, limit: 5, search: searchTerm });

            // Tratamos a resposta para não quebrar o .map
            setLogs(response.logs || []);
            setTotalPages(response.totalPages || 1);
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
            <S.TopBar>
                <S.TitleGroup>
                    <h2>
                        <FiActivity color="#00ff88" /> Auditoria do Sistema
                        <S.PageBadge>atividade recente</S.PageBadge>
                    </h2>
                </S.TitleGroup>

                <S.ControlsGroup>
                    <S.ControlField $width="280px">
                        <InputV2
                            placeholder="Pesquisar..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            icon={<FiSearch size={16} />}
                            fullWidth
                        />
                    </S.ControlField>
                </S.ControlsGroup>
            </S.TopBar>

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
                                <td><span style={{ color: 'var(--primary)' }}>{translateAction(log.action)}</span></td>
                                <td>
                                    <InfoCard value={log.details || 'Sem detalhes'} />
                                </td>
                                <td>{new Date(log.createdAt).toLocaleString('pt-BR')}</td>
                            </tr>
                        ))}
                    </tbody>
                </S.AuditTable>
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                    setCurrentPage(page);
                    loadLogs(page);
                }}
            />
        </S.Container>
    );
}