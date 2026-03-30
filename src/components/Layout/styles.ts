import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #050505;
`;

export const Content = styled.main`
  flex: 1;
  margin-top: 70px;   /* Altura do seu Header fixo */
  margin-bottom: 60px; /* NOVO: Espaço para o Footer fixo não cobrir o conteúdo */
  margin-left: 240px; /* Largura da Sidebar */
  padding: 20px;
  width: calc(100% - 240px); /* Garante que o conteúdo não estoure a largura */

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 70px;
    margin-bottom: 0; /* No mobile o footer não é fixo, então não precisa de margem */
    width: 100%;
  }
`;