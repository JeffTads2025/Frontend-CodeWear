import styled from 'styled-components';

export const Container = styled.aside`
  width: 280px;
  background-color: var(--sidebar);
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  border-right: 1px solid #1e293b;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 48px;

  .icon-box {
    background-color: var(--primary);
    color: white;
    width: 42px;
    height: 42px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
  }

  h1 { font-size: 20px; color: white; font-weight: 700; }
  p { font-size: 12px; color: var(--text-secondary); }
`;

export const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .label {
    color: #475569;
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 12px;
    letter-spacing: 0.05em;
  }
`;

export const MenuItem = styled.a<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border-radius: 12px;
  text-decoration: none;
  font-size: 15px;
  transition: all 0.2s;
  
  color: ${props => props.active ? 'white' : 'var(--text-secondary)'};
  background-color: ${props => props.active ? 'var(--primary)' : 'transparent'};
  
  &:hover {
    background-color: ${props => props.active ? 'var(--primary)' : 'rgba(13, 153, 255, 0.1)'};
    color: white;
  }
`;