import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* Cor base escura para todo o layout */
  background: #050505; 
  /* Remove qualquer overflow que possa causar espaços em branco */
  overflow-x: hidden; 
`;

export const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  
  /* Ajuste das distâncias para colar nos componentes vizinhos */
  margin-top: 70px;    /* Altura exata do Header */
  margin-left: 240px;  /* Largura exata da Sidebar */
  
  /* Reset de fundo para garantir que ele herde o preto do Container */
  background: #050505; 
  
  /* Preenchimento interno do conteúdo */
  // padding: 20px;
  
  /* Cálculo para ocupar o restante da tela sem sobrar espaço */
  width: calc(100% - 240px);
  min-height: calc(100vh - 70px);

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;