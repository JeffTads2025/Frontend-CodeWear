import styled from 'styled-components';

export const Container = styled.header`
  /* AJUSTES PARA FIXAR O HEADER */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  z-index: 1000; /* Garante que o conteúdo passe por baixo */
  
  background: #0d0d0d;
  border-bottom: 1px solid #222;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  
  /* Sombra leve para dar profundidade ao scroll */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoArea = styled.div`
  cursor: pointer;
  h2 {
    color: #fff;
    font-size: 1.4rem;
    margin: 0;
    font-weight: 700;
  }
`;

export const IconsArea = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  button {
    background: none;
    border: none;
    color: #888;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    transition: color 0.2s;

    &:hover { color: #00ff88; }

    span {
        margin-left: 8px;
        font-size: 0.9rem;
    }

    &.cart .badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #00ff88;
      color: #000;
      font-size: 0.7rem;
      font-weight: bold;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .logout-btn {
    margin-left: 10px;
    &:hover { color: #ff4444; }
  }
`;