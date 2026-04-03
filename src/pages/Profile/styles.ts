import styled from 'styled-components';

export const Container = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  gap: 32px; 
  width: 100%; /* Garante que ocupe a largura toda */
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 40px 20px;
  background: #000000; /* PRETO ABSOLUTO para sumir com a cor antiga */
  min-height: 100vh;
`;

export const Header = styled.header`
  display: flex; 
  align-items: center; 
  gap: 16px;
  width: 100%;
  max-width: 800px;

  .icon-bg { 
    background: #ffcc00; 
    padding: 12px; 
    border-radius: 12px; 
    color: #000; 
    display: flex; 
    font-size: 24px; 
  }
  
  h2 { color: white; margin: 0; font-size: 28px; font-weight: 700; } 
  p { color: #999; margin: 4px 0 0 0; }
`;

export const Content = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center; 
  gap: 32px;
  width: 100%;
`;

export const ProfileCard = styled.div`
  background: #161616; 
  border: 1px solid #222; 
  padding: 32px; 
  border-radius: 16px;
  width: 100%;
  max-width: 800px;

  .card-header {
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-bottom: 30px;

    h3 { color: white; margin: 0; font-weight: 700; }
    
    .actions { display: flex; gap: 12px; }
    
    button { 
      padding: 8px 20px; 
      border-radius: 8px; 
      cursor: pointer; 
      display: flex; 
      align-items: center; 
      gap: 8px; 
      font-weight: 700; 
      transition: all 0.2s;

      &.edit-btn { 
        background: transparent; 
        border: 1px solid #ffcc00; 
        color: #ffcc00; 
        &:hover { background: #ffcc00; color: #000; } 
      }
      &.save-btn { 
        background: #ffcc00; 
        border: 1px solid #ffcc00; 
        color: #000; 
        &:hover { background: #e6b800; transform: scale(1.02); } 
      }
      &.cancel-btn { 
        background: transparent; 
        border: 1px solid #ef4444; 
        color: #ef4444; 
        &:hover { background: #ef4444; color: white; } 
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

    label { color: #666; font-size: 13px; display: flex; align-items: center; gap: 6px; font-weight: bold; }
    
    p { 
      color: white; 
      font-size: 15px; 
      margin: 0; 
      background: #0d0d0d; 
      padding: 12px; 
      border-radius: 8px; 
      border: 1px solid #222;
      &.disabled-field { color: #555; background: rgba(0,0,0,0.2); }
    }

    input, textarea { 
      background: #0d0d0d; 
      border: 1px solid #2a2a2a; 
      border-radius: 8px; 
      padding: 12px; 
      color: white; 
      outline: none;
      transition: border-color 0.2s;
      &:focus { border-color: #ffcc00; }
    }
  }
  .full-width { grid-column: 1 / -1; }
`;

export const SecurityCard = styled.div`
  background: #161616; 
  padding: 32px; 
  border-radius: 16px; 
  border: 1px solid #222;
  width: 100%;
  max-width: 800px;

  h3 { color: white; margin-bottom: 12px; font-size: 18px; font-weight: 700; }
  p { color: #999; font-size: 14px; margin-bottom: 24px; line-height: 1.6; }
  
  .account-status { 
    border-top: 1px solid #222; 
    padding-top: 20px; 
    display: flex; 
    justify-content: space-between;
    span { color: #666; font-weight: bold; }
    span:last-child { color: #ffcc00; font-weight: 800; }
  }
`;