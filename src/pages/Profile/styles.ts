import styled from 'styled-components';

export const Container = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center; /* Centraliza o Header e o Content horizontalmente */
  gap: 32px; 
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 40px 20px;
`;

export const Header = styled.header`
  display: flex; 
  align-items: center; 
  gap: 16px;
  width: 100%;
  max-width: 800px; /* Alinha a largura com o card centralizado */

  .icon-bg { 
    background: #0087ff; 
    padding: 12px; 
    border-radius: 12px; 
    color: white; 
    display: flex; 
    font-size: 24px; 
  }
  
  h2 { color: white; margin: 0; font-size: 28px; } 
  p { color: #94a3b8; margin: 4px 0 0 0; }
`;

export const Content = styled.div`
  /* Alterado de GRID para FLEX para facilitar a centralização única */
  display: flex; 
  flex-direction: column;
  align-items: center; 
  gap: 32px;
  width: 100%;
`;

export const ProfileCard = styled.div`
  background: #1e293b; 
  border: 1px solid #334155; 
  padding: 32px; 
  border-radius: 16px;
  width: 100%;
  max-width: 800px; /* Define a largura máxima do card centralizado */

  .card-header {
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-bottom: 30px;

    h3 { color: white; margin: 0; }
    
    .actions { display: flex; gap: 12px; }
    
    button { 
      padding: 8px 20px; 
      border-radius: 8px; 
      cursor: pointer; 
      display: flex; 
      align-items: center; 
      gap: 8px; 
      font-weight: 600; 
      transition: all 0.2s;

      &.edit-btn { 
        background: transparent; 
        border: 1px solid #0087ff; 
        color: #0087ff; 
        &:hover { background: #0087ff; color: white; } 
      }
      &.save-btn { 
        background: #0087ff; 
        border: 1px solid #0087ff; 
        color: white; 
        &:hover { filter: brightness(1.2); } 
      }
      &.cancel-btn { 
        background: transparent; 
        border: 1px solid #f75a68; 
        color: #f75a68; 
        &:hover { background: #f75a68; color: white; } 
      }
    }
  }
`;

export const InfoGroup = styled.div`
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 24px;

  @media (max-width: 600px) { grid-template-columns: 1fr; }

  .field {
    display: flex; 
    flex-direction: column; 
    gap: 8px;

    label { color: #94a3b8; font-size: 13px; display: flex; align-items: center; gap: 6px; }
    
    p { 
      color: white; 
      font-size: 15px; 
      margin: 0; 
      background: #0f172a; 
      padding: 12px; 
      border-radius: 8px; 
      border: 1px solid transparent;
      &.disabled-field { color: #64748b; background: rgba(0,0,0,0.1); }
    }

    input, textarea { 
      background: #0f172a; 
      border: 1px solid #334155; 
      border-radius: 8px; 
      padding: 12px; 
      color: white; 
      outline: none;
      &:focus { border-color: #0087ff; }
    }
  }
  .full-width { grid-column: 1 / -1; }
`;

/* Se você decidir manter o SecurityCard, ele agora aparecerá ABAIXO do ProfileCard, também centralizado */
export const SecurityCard = styled.div`
  background: #1e293b; 
  padding: 32px; 
  border-radius: 16px; 
  border: 1px solid #334155;
  width: 100%;
  max-width: 800px;

  h3 { color: white; margin-bottom: 12px; font-size: 18px; }
  p { color: #94a3b8; font-size: 14px; margin-bottom: 24px; line-height: 1.6; }
  
  .account-status { 
    border-top: 1px solid #334155; 
    padding-top: 20px; 
    display: flex; 
    justify-content: space-between;
    span { color: #94a3b8; }
    span:last-child { color: #0087ff; font-weight: bold; }
  }
`;