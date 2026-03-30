import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
`;

export const ProductCard = styled.div`
  background: var(--sidebar, #111827);
  border-radius: 12px;
  border: 1px solid #1e293b;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary, #3b82f6);
  }

  .image-container {
    height: 300px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    padding: 1.5rem;
    h3 { color: white; font-size: 18px; margin-bottom: 8px; }
    .description { 
      color: #94a3b8; 
      font-size: 13px; 
      margin-bottom: 16px; 
      height: 40px; 
      overflow: hidden; 
    }
    .size-selector { display: flex; gap: 8px; margin-bottom: 20px; }
    .footer-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #1e293b;
      padding-top: 16px;
      .price { color: white; font-weight: bold; font-size: 18px; }
    }
  }
`;

export const SizeBadge = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? 'var(--primary, #3b82f6)' : '#1e293b'};
  color: white;
  border: 1px solid ${props => props.$active ? 'var(--primary, #3b82f6)' : 'transparent'};
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;

  &:hover {
    border-color: var(--primary, #3b82f6);
  }
`;

export const AddButton = styled.button`
  background: var(--primary, #3b82f6);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const ImageModalOverlay = styled.div<{ $active: boolean }>`
  display: ${props => props.$active ? 'flex' : 'none'};
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 999;
  align-items: center;
  justify-content: center;
  padding: 20px;

  img {
    max-width: 100%;
    max-height: 90vh;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
  }
`;