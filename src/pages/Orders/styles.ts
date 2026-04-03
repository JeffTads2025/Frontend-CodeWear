import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  background: #0a0a0a; /* Fundo escuro do tema */
  min-height: 100vh;
  
  /* AFASTAMENTO DA SIDEBAR: 
     Aumentamos o padding da esquerda para o conteúdo não ficar colado no menu */
  padding: 40px 20px 40px 80px;

  @media (max-width: 768px) {
    padding: 20px; /* Em telas pequenas o padding volta ao normal */
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 16px;

  .icon-bg {
    background: #ffcc00; /* Amarelo Admin */
    padding: 12px;
    border-radius: 12px;
    color: #000; /* Ícone preto no fundo amarelo */
    display: flex;
    font-size: 24px;
  }

  div {
    h2 { color: white; font-size: 28px; margin: 0; font-weight: 700; }
    p { color: #999; margin: 4px 0 0 0; font-size: 14px; }
  }
`;

export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 900px;
`;

export const OrderCard = styled.div`
  background: #161616; /* Mesmo fundo do ProductCard */
  border: 1px solid #222; /* Borda discreta */
  border-radius: 16px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #ffcc00; /* Destaque no hover */
    transform: translateY(-2px);
  }

  img { 
    width: 80px; 
    height: 80px; 
    border-radius: 12px; 
    object-fit: cover;
    background: #0d0d0d;
  }

  .info {
    flex: 1;
    span { color: #666; font-size: 12px; font-weight: bold; }
    h3 { color: white; font-size: 16px; margin: 4px 0; font-weight: 700; }
    
    .status {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      margin-top: 4px;
      color: #999;
    }
  }

  .price {
    color: #fff; /* Preço branco conforme o rodapé do card de produto */
    font-weight: 800;
    font-size: 1.2rem;
  }
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
  padding-bottom: 40px;

  button {
    background: #111;
    border: 1px solid #2a2a2a;
    color: #fff;
    padding: 8px 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: 0.2s;
    font-weight: bold;

    &:disabled { 
      opacity: 0.2; 
      cursor: not-allowed; 
    }

    &:not(:disabled):hover { 
      border-color: #ffcc00;
      color: #ffcc00;
      background: #1a1a1a;
    }
  }

  span { color: #999; font-size: 14px; font-weight: 500; }
`;