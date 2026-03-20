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
    background-color: var(--primary);
    width: 42px;
    height: 42px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
  }

  div {
    h2 { font-size: 24px; color: white; }
    p { color: var(--text-secondary); font-size: 13px; }
  }
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
  margin-top: 10px;
`;

export const ProductCard = styled.div`
  background-color: var(--sidebar);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #1e293b;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-bottom: 1px solid #1e293b;
    cursor: zoom-in; /* Indica que pode ampliar */
  }

  .content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;

    h3 { color: white; font-size: 15px; font-weight: 600; }
    .description { color: var(--text-secondary); font-size: 12px; line-height: 1.4; }
    .price { color: var(--primary); font-size: 18px; font-weight: bold; margin-top: 8px; }
  }
`;

export const SizeBadge = styled.span<{ active?: boolean }>`
  background: ${props => props.active ? 'var(--primary)' : '#1e293b'};
  color: ${props => props.active ? 'white' : '#94a3b8'};
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
`;

export const AddButton = styled.button`
  background-color: var(--primary);
  color: white;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  font-size: 13px;
  margin-top: 12px;
  border: none;
`;

// ESTILO DO ZOOM (MODAL)
export const ImageModalOverlay = styled.div<{ active?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: ${props => props.active ? 1 : 0};
  visibility: ${props => props.active ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  cursor: zoom-out;

  img {
    max-width: 85%;
    max-height: 85%;
    border-radius: 12px;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
    transform: scale(${props => props.active ? 1 : 0.7});
    transition: transform 0.3s ease;
  }
`;