
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
  background: transparent;
  min-height: 100%;
  color: #fff;
`;

export const TopBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0;
    font-family: inherit;
    font-size: 1.5em;
    font-weight: 700;
    color: inherit;
  }
`;

export const ControlsGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    justify-content: stretch;
  }
`;

export const ControlField = styled.div<{ $width?: string }>`
  width: ${({ $width }) => $width || 'auto'};

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const PageBadge = styled.span`
  font-size: 0.8rem;
  background: #00ff8822;
  color: #00ff88;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid #00ff8844;
`;

export const MetricsRow = styled.div`
  display: flex;
  gap: 15px;
  margin: 10px 0 30px;
  flex-wrap: wrap;
`;

export const MetricCard = styled.div`
  background: #161616;
  padding: 20px;
  border-radius: 12px;
  flex: 1;
  min-width: 220px;
  border: 1px solid #333;

  span {
    color: #888;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  h2 {
    color: #fff;
    font-size: 1.5rem;
    margin: 5px 0 0;
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
