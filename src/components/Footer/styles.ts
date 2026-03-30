import styled from 'styled-components';

export const Container = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background: transparent; 
  z-index: 1000;
  display: flex;
  align-items: center;
  pointer-events: none; 

  @media (max-width: 768px) {
    position: relative;
    height: auto;
  }
`;

export const ContentWrapper = styled.div`
  margin-left: 240px;
  width: calc(100% - 240px);
  height: 100%;
  background-color: #0d0d0d;
  border-top: 1px solid #1a1a1a;
  
  display: flex;
  flex-direction: column; 
  justify-content: center;
  gap: 8px; 
  
  padding: 0 30px;
  pointer-events: auto;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Alinha tudo à esquerda em sequência */
  gap: 20px;
  width: 100%;
`;

export const Contact = styled.div`
  ul {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 0;
    margin: 0;
    li {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #999;
      font-size: 0.75rem;
      svg { color: #00ff88; min-width: 14px; }
    }
  }
`;

export const MapSection = styled.div`
  a {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    background: #111;
    border: 1px solid #222;
    border-radius: 4px;
    text-decoration: none;
    transition: 0.2s;
    
    svg { color: #00ff88; }
    span { color: #00ff88; font-size: 0.7rem; font-weight: bold; }

    &:hover {
      border-color: #00ff88;
      background: #1a1a1a;
    }
  }
`;

export const Social = styled.div`
  display: flex;
  gap: 15px;
  padding-left: 20px;
  border-left: 1px solid #222; /* Divisória entre Endereço/Mapa e Redes Sociais */
  
  a { 
    color: #555; 
    transition: 0.2s; 
    display: flex;
    &:hover { color: #00ff88; } 
  }
`;

export const Copyright = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  
  p { 
    color: #444; 
    font-size: 0.65rem; 
    margin: 0;
    letter-spacing: 0.5px;
  }
`;