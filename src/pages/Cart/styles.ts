import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  /* RESTAURADO: Formatação original da primeira imagem */
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 16px;
  .icon-bg {
    /* MUDANÇA DE COR: Fundo Amarelo #ffcc00 */
    background: #ffcc00; 
    padding: 12px;
    border-radius: 12px;
    /* MUDANÇA DE COR: Ícone Preto #000 */
    color: #000; 
    display: flex;
  }
  h2 { 
    /* MUDANÇA DE COR: Texto Branco #fff */
    color: #fff; 
    font-size: 28px; 
    /* RESTAURADO: Peso de fonte original */
  }
`;

export const Content = styled.div`
  display: grid;
  /* RESTAURADO: Proporção original de 350px para o resumo */
  grid-template-columns: 1fr 350px; 
  gap: 32px;
  @media (max-width: 1000px) { grid-template-columns: 1fr; }
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  .empty-cart-btn {
    /* MUDANÇA DE COR: Fundo Amarelo #ffcc00 */
    background: #ffcc00; 
    /* MUDANÇA DE COR: Texto Preto #000 */
    color: #000; 
    border: none;
    /* RESTAURADO: Padding original */
    padding: 10px 20px; 
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.2s;
    &:hover { background: #e6b800; }
  }
`;

export const ItemCard = styled.div`
  /* MUDANÇA DE COR: Fundo Cinza Escuro #161616 */
  background: #161616; 
  /* MUDANÇA DE COR: Borda Cinza Discreta #222 */
  border: 1px solid #222; 
  border-radius: 16px;
  /* RESTAURADO: Padding original */
  padding: 16px 24px; 
  display: flex;
  align-items: center;
  gap: 20px;
  transition: 0.2s;

  &:hover {
    /* MUDANÇA DE COR: Borda Amarela #ffcc00 */
    border-color: #ffcc00;
  }

  /* RESTAURADO: Tamanho original da imagem (80x80) */
  img { width: 80px; height: 80px; border-radius: 12px; object-fit: cover; background: #0d0d0d; }
  
  .info { 
    flex: 1; 
    /* RESTAURADO: Tamanho de fonte original */
    h3 { color: white; font-size: 16px; } 
    p { color: #888; font-size: 0.85rem; }
  }
  
  /* MUDANÇA DE COR: Preço Amarelo #ffcc00 */
  .price { color: #ffcc00; font-weight: bold; font-size: 18px; }

  .qty-btn {
    /* MUDANÇA DE COR: Fundo Preto #111 */
    background: #111; 
    /* MUDANÇA DE COR: Borda Cinza Discreta #2a2a2a */
    border: 1px solid #2a2a2a; 
    /* MUDANÇA DE COR: Ícone Amarelo #ffcc00 */
    color: #ffcc00; 
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    &:disabled { opacity: 0.2; cursor: not-allowed; }
  }
  
  .qty-value { color: white; font-weight: bold; }
  
  .remove-btn { 
    background: none; 
    border: none; 
    color: #ef4444; 
    cursor: pointer; 
    padding: 8px;
    border-radius: 8px;
    transition: 0.2s;
    &:hover { background: rgba(239, 68, 68, 0.1); }
  }
`;

export const SizeBadge = styled.span<{ $active?: boolean }>`
  /* MUDANÇA DE COR: Fundo Amarelo #ffcc00 ou Preto #111 */
  background: ${props => props.$active ? '#ffcc00' : '#111'};
  /* MUDANÇA DE COR: Texto Preto #000 ou Cinza #999 */
  color: ${props => props.$active ? '#000' : '#999'};
  /* MUDANÇA DE COR: Borda Amarela #ffcc00 ou Cinza #2a2a2a */
  border: 1px solid ${props => props.$active ? '#ffcc00' : '#2a2a2a'};
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
`;

export const Summary = styled.aside`
  /* MUDANÇA DE COR: Fundo Cinza Escuro #161616 */
  background: #161616; 
  border-radius: 16px;
  /* RESTAURADO: Padding original */
  padding: 24px; 
  /* MUDANÇA DE COR: Borda Cinza Discreta #222 */
  border: 1px solid #222; 
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: fit-content;

  h3 { 
    color: white; 
    /* MUDANÇA DE COR: Borda Cinza Discreta #222 */
    border-bottom: 1px solid #222; 
    padding-bottom: 12px; 
  }
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    color: #999;
    font-size: 0.95rem;
    span.value { color: #fff; }
  }

  .total-section {
    /* MUDANÇA DE COR: Borda Cinza Discreta #222 */
    border-top: 1px solid #222; 
    /* RESTAURADO: Padding original */
    padding-top: 15px; 
    
    .total {
      display: flex;
      justify-content: space-between;
      span { color: #999; }
      /* MUDANÇA DE COR: Preço Amarelo #ffcc00 */
      /* RESTAURADO: Tamanho de fonte original */
      strong { color: #ffcc00; font-size: 22px; font-weight: bold; } 
    }
  }

  .checkout-btn {
    /* MUDANÇA DE COR: Fundo Amarelo #ffcc00 */
    background: #ffcc00; 
    /* MUDANÇA DE COR: Texto Preto #000 */
    color: #000; 
    border: none;
    /* RESTAURADO: Padding original */
    padding: 15px; 
    border-radius: 12px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: 0.2s;
    &:hover:not(:disabled) { background: #e6b800; }
    &:disabled { background: #333; color: #666; cursor: not-allowed; }
  }
`;

export const PaymentSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  p { color: #999; font-size: 14px; font-weight: bold; margin-bottom: 4px; }
  
  button {
    /* MUDANÇA DE COR: Fundo Preto #111 */
    background: #111; 
    /* MUDANÇA DE COR: Borda Cinza Discreta #2a2a2a */
    border: 1px solid #2a2a2a; 
    color: #999;
    padding: 12px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: all 0.2s;
    &:hover { border-color: #444; color: #fff; }

    &.active {
      /* MUDANÇA DE COR: Borda Amarela #ffcc00 */
      border-color: #ffcc00; 
      /* MUDANÇA DE COR: Texto Amarelo #ffcc00 */
      color: #ffcc00; 
      background: rgba(255, 204, 0, 0.05);
    }
  }
`;