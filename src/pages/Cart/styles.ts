import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 16px;
  .icon-bg {
    background: var(--primary);
    padding: 12px;
    border-radius: 12px;
    color: white;
    display: flex;
  }
  h2 { color: white; font-size: 28px; }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 32px;
  @media (max-width: 1000px) { grid-template-columns: 1fr; }
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  .empty-cart-btn {
    background: var(--primary);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
  }
`;

export const ItemCard = styled.div`
  background: var(--sidebar);
  border: 1px solid #1e293b;
  border-radius: 16px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 20px;

  img { width: 80px; height: 80px; border-radius: 12px; object-fit: cover; }
  .info { flex: 1; h3 { color: white; font-size: 16px; } }
  .price { color: var(--primary); font-weight: bold; font-size: 18px; }

  .qty-btn {
    background: #1e293b;
    border: 1px solid #334155;
    color: white;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    &:disabled { opacity: 0.3; }
  }
  .qty-value { color: white; font-weight: bold; }
  .remove-btn { background: none; border: none; color: #ef4444; cursor: pointer; }
`;

export const SizeBadge = styled.button<{ $active?: boolean }>`
  background: #1e293b;
  border: 1px solid #334155;
  color: #94a3b8;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
  ${props => props.$active && css`
    background: var(--primary);
    border-color: var(--primary);
    color: white;
  `}
`;

export const Summary = styled.aside`
  background: var(--sidebar);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #1e293b;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: fit-content;

  h3 { color: white; border-bottom: 1px solid #1e293b; padding-bottom: 12px; }
  
  .total-section {
    border-top: 1px solid #1e293b;
    padding-top: 15px;
    .total {
      display: flex;
      justify-content: space-between;
      span { color: #94a3b8; }
      strong { color: var(--primary); font-size: 22px; }
    }
  }

  .checkout-btn {
    background: var(--primary);
    color: white;
    border: none;
    padding: 15px;
    border-radius: 12px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    &:disabled { opacity: 0.5; }
  }
`;

export const PaymentSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  p { color: #94a3b8; font-size: 14px; }
  
  button {
    background: #1e293b;
    border: 1px solid #334155;
    color: #94a3b8;
    padding: 12px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: all 0.2s;

    &.active {
      border-color: var(--primary);
      color: white;
      background: rgba(var(--primary-rgb), 0.1);
    }
  }
`;