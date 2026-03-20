import styled from 'styled-components';

export const Container = styled.div`
  display: flex; flex-direction: column; gap: 32px;
`;

export const Header = styled.header`
  display: flex; align-items: center; gap: 16px;
  .icon-bg { background: var(--primary); padding: 12px; border-radius: 12px; color: white; display: flex; font-size: 24px; }
  h2 { color: white; } p { color: #94a3b8; }
`;

export const Content = styled.div`
  display: grid; grid-template-columns: 1fr 300px; gap: 32px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

export const ProfileCard = styled.div`
  background: var(--sidebar); border: 1px solid #1e293b; padding: 32px; border-radius: 16px;
  
  .card-header {
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;
    h3 { color: white; }
    button { 
      background: transparent; border: 1px solid var(--primary); color: var(--primary);
      padding: 8px 16px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 8px;
      transition: all 0.2s;
      &:hover { background: var(--primary); color: white; }
    }
  }
`;

export const InfoGroup = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }

  .field {
    display: flex; flex-direction: column; gap: 8px;
    label { color: #94a3b8; font-size: 14px; display: flex; align-items: center; gap: 6px; }
    p { color: white; font-size: 16px; font-weight: 500; }
    input, textarea {
      background: #0f172a; border: 1px solid #1e293b; border-radius: 8px;
      padding: 10px; color: white; outline: none; font-size: 15px;
      &:focus { border-color: var(--primary); }
    }
  }
`;

export const SecurityCard = styled.div`
  background: #1e293b; padding: 24px; border-radius: 16px; height: fit-content;
  h3 { color: white; margin-bottom: 8px; }
  p { color: #94a3b8; font-size: 14px; margin-bottom: 16px; }
  
  .secondary-btn {
    width: 100%; padding: 12px; background: #334155; border: none; color: white;
    border-radius: 8px; font-weight: bold; cursor: pointer; margin-bottom: 24px;
    &:hover { background: #475569; }
  }

  .account-status {
    border-top: 1px solid #334155; padding-top: 16px; display: flex; justify-content: space-between;
    span { color: #94a3b8; font-size: 14px; }
  }
`;