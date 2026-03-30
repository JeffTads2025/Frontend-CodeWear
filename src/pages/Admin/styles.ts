
import styled from 'styled-components';

export const Container = styled.div`
  padding: 40px;
  background: #0a0a0a;
  min-height: 100vh;
  color: #fff;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 40px;

  h2 {
    font-size: 1.8rem;
    color: #fff;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
`;

export const StatCard = styled.div`
  background: #161616;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid #222;

  .icon-box {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }

  span {
    color: #888;
    font-size: 0.8rem;
    display: block;
    margin-bottom: 5px;
  }

  h3 {
    font-size: 1.4rem;
    color: #fff;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 30px;
  align-items: start;
`;

export const Card = styled.div`
  background: #161616;
  padding: 35px; /* Aumentado para preencher melhor */
  border-radius: 12px;
  border: 1px solid #222;
  min-height: 480px; /* Garante que o card de Novo Produto fique robusto */

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 30px;
    font-size: 1.3rem;
    color: #ffcc00;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  input {
    background: #0d0d0d;
    border: 1px solid #333;
    padding: 16px;
    border-radius: 8px;
    color: #fff;
    font-size: 1rem;
    outline: none;

    &:focus {
      border-color: #ffcc00;
    }
  }

  button {
    background: #ffcc00;
    color: #000;
    padding: 16px;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1.1rem;
    border: none;
    cursor: pointer;
    transition: 0.2s;
    margin-top: 10px;

    &:hover {
      background: #e6b800;
    }
  }
`;

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 550px;
  overflow-y: auto;
  padding-right: 10px;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: #161616;
  border-radius: 8px;

  th {
    background: #1a1a1a;
    padding: 15px;
    text-align: left;
    color: #ffcc00;
    font-size: 0.9rem;
    border-bottom: 2px solid #222;
  }

  td {
    padding: 15px;
    border-bottom: 1px solid #222;
    color: #ccc;
    font-size: 0.85rem;
  }
`;

export const AuditTable = Table;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 30px;

  button {
    background: #1a1a1a;
    border: 1px solid #333;
    color: #fff;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    &:disabled { opacity: 0.3; }
    &:hover:not(:disabled) { background: #ffcc00; color: #000; }
  }
`;
