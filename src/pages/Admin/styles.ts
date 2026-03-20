import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  color: white;
  h2 { font-size: 24px; }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background: #1e293b;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #334155;
  color: white;

  h3 {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    label { font-size: 14px; color: #94a3b8; }
    input {
      background: #0f172a;
      border: 1px solid #334155;
      padding: 10px;
      border-radius: 6px;
      color: white;
      &:focus { border-color: var(--primary); }
    }
  }

  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  button {
    background: var(--primary);
    color: white;
    border: none;
    padding: 12px;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
    &:hover { filter: brightness(1.1); }
  }
`;

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .product-item {
    display: flex;
    align-items: center;
    gap: 16px;
    background: #0f172a;
    padding: 12px;
    border-radius: 8px;

    img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 4px;
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      strong { font-size: 14px; }
      span { font-size: 12px; color: #94a3b8; }
    }

    .delete-btn {
      background: #ef444422;
      color: #ef4444;
      border: none;
      padding: 8px;
      border-radius: 6px;
      cursor: pointer;
      &:hover { background: #ef4444; color: white; }
    }
  }
`;