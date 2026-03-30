import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  /* IMPORTANTE: Não coloque width fixa ou margin: auto aqui 
     para não criar o efeito de 'quadrado' */
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 16px;

  .icon-bg {
    background: var(--primary); /* Azul/Verde do seu tema */
    padding: 12px;
    border-radius: 12px;
    color: white;
    display: flex;
    font-size: 24px;
  }

  div {
    h2 { color: white; font-size: 28px; margin: 0; }
    p { color: #94a3b8; margin: 4px 0 0 0; font-size: 14px; }
  }
`;

export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 900px; /* Limite para o card não esticar no monitor ultra-wide */
`;

export const OrderCard = styled.div`
  background: var(--sidebar); /* Mesmo fundo dos itens do carrinho */
  border: 1px solid #1e293b;
  border-radius: 16px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 20px;

  img { 
    width: 80px; 
    height: 80px; 
    border-radius: 12px; 
    object-fit: cover; 
  }

  .info {
    flex: 1;
    span { color: #64748b; font-size: 12px; }
    h3 { color: white; font-size: 16px; margin: 4px 0; }
    
    .status {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      margin-top: 4px;
      /* As cores FiCheckCircle e FiClock você já definiu no index via props */
    }
  }

  .price {
    color: var(--primary);
    font-weight: bold;
    font-size: 18px;
  }
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
  padding-bottom: 40px;

  button {
    background: var(--sidebar);
    border: 1px solid #1e293b;
    color: white;
    padding: 8px 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: 0.2s;

    &:disabled { opacity: 0.4; cursor: not-allowed; }
    &:not(:disabled):hover { border-color: var(--primary); }
  }

  span { color: #94a3b8; font-size: 14px; }
`;