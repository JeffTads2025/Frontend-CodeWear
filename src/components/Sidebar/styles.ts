import styled from 'styled-components';

export const Container = styled.aside`
  width: 240px; 
  background-color: #0d0d0d;
  border-right: 1px solid #222;
  position: fixed;
  left: 0;
  top: 104px; 
  height: calc(100vh - 104px); 
  display: flex;
  flex-direction: column;
  z-index: 900; 
  overflow: hidden;
  padding: 0.8rem 0; /* Padding reduzido para dar mais espaço vertical */

  .group-title {
    color: #444;
    font-size: 0.6rem;
    font-weight: bold;
    padding: 0 1.5rem;
    margin-bottom: 0.4rem;
    display: block;
    text-transform: uppercase;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1px; /* Gap mínimo para economizar espaço */
  flex: 1;
`;

export const FooterNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-top: auto;
  padding-top: 0.8rem;
  padding-bottom: 25px; 
  border-top: 1px solid #1a1a1a;
`;

export const NavItem = styled.div`
  padding: 0.6rem 1.5rem; /* Altura de cada item reduzida para caber Auditoria */
  color: #888;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 0.82rem;
  transition: 0.2s;

  &:hover { color: #00ff88; background: rgba(0, 255, 136, 0.05); }
  
  &.active { 
    color: #fff; 
    background: #0088ff; 
    border-radius: 0 8px 8px 0; 
    margin-right: 10px;
    font-weight: 600;
  }
  
  &.logout:hover { color: #ff4444; }
`;