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
    font-size: 24px;
    display: flex;
  }
  h2 { color: white; font-size: 28px; }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 32px;
  align-items: flex-start;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ItemCard = styled.div`
  background: var(--sidebar);
  border: 1px solid #1e293b;
  border-radius: 16px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 20px;

  img {
    width: 90px;
    height: 90px;
    border-radius: 12px;
    object-fit: cover;
  }

  .info {
    flex: 1;
    h3 { color: white; font-size: 18px; margin-bottom: 4px; }
    span { color: var(--primary); font-weight: bold; font-size: 18px; }
  }
`;

export const SizeBadge = styled.button<{ active?: boolean }>`
  background: #1e293b;
  border: 1px solid #334155;
  color: #94a3b8;
  padding: 4px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;

  ${props => props.active && css`
    background: var(--primary);
    border-color: var(--primary);
    color: white;
  `}

  &:hover {
    border-color: var(--primary);
  }
`;

export const Summary = styled.aside`
  background: var(--sidebar);
  border: 1px solid #1e293b;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h3 { color: white; font-size: 20px; border-bottom: 1px solid #1e293b; padding-bottom: 12px; }

  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span { color: var(--text-secondary); }
    strong { color: var(--primary); font-size: 24px; }
  }

  button {
    background: var(--primary);
    color: white;
    border: none;
    padding: 16px;
    border-radius: 12px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: filter 0.2s;

    &:disabled { opacity: 0.5; cursor: not-allowed; }
    &:hover:not(:disabled) { filter: brightness(1.1); }
  }
`;