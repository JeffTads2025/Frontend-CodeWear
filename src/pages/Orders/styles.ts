import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 16px;
  
  .icon-bg {
    background: var(--primary);
    width: 42px;
    height: 42px;
    border-radius: 10px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }

  h2 { color: white; font-size: 24px; }
  p { color: #94a3b8; font-size: 14px; }
`;

export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const OrderCard = styled.div`
  background: var(--sidebar);
  border: 1px solid #1e293b;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(5px);
    border-color: var(--primary);
  }

  img {
    width: 70px;
    height: 70px;
    border-radius: 8px;
    object-fit: cover;
    background: #0f172a;
  }

  .info {
    flex: 1;
    
    span { 
      font-size: 11px; 
      color: #64748b; 
      text-transform: uppercase; 
      letter-spacing: 0.5px;
    }

    h3 { 
      color: white; 
      font-size: 16px; 
      margin: 4px 0; 
    }

    .status { 
      display: flex; 
      align-items: center; 
      gap: 8px; 
      font-size: 13px; 
      color: #94a3b8; 

      .date {
        color: #475569;
        font-size: 12px;
      }
    }
  }

  .price {
    font-weight: bold;
    color: var(--primary);
    font-size: 18px;
    text-align: right;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;

    .price {
      text-align: left;
      width: 100%;
      border-top: 1px solid #1e293b;
      padding-top: 10px;
    }
  }
`;