import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px; /* Reduzi um pouco o padding superior */
  background: #0a0a0a;
  min-height: 100vh;
`;

export const ProductGrid = styled.div`
  display: grid;
  /* Mantive o minmax em 220px, que é o Sweet Spot */
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px; /* Reduzi o gap para 20px para caberem mais cards */

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
  }
`;

export const ProductCard = styled.div`
  background: #161616;
  border-radius: 12px;
  border: 1px solid #222;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  /* AUMENTEI A ALTURA TOTAL DO CARD para 460px para comportar a imagem maior */
  height: 460px; 

  &:hover {
    transform: translateY(-5px);
    border-color: #ffcc00;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  }

  .image-container {
    /* ALTURA DA IMAGEM AUMENTADA: De 180px para 230px */
    height: 230px; 
    overflow: hidden;
    background: #0d0d0d;
    position: relative;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease-in-out;
    }
  }
  
  &:hover .image-container img {
    transform: scale(1.08); /* Zoom ligeiramente menor para não cortar muito */
  }

  .content {
    /* Padding interno mais compacto: 15px */
    padding: 15px; 
    flex: 1;
    display: flex;
    flex-direction: column;
    /* justify-content: flex-start garante que o texto fique grudado em cima */
    justify-content: flex-start; 

    h3 { 
      color: #fff; 
      font-size: 1.05rem; /* Fonte ligeiramente menor para o título */
      margin-bottom: 4px; /* Menos margem */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 700;
    }

    .description { 
      color: #999; /* Cinza um pouco mais claro */
      font-size: 0.8rem; /* Fonte menor */
      margin-bottom: 12px; 
      line-height: 1.4;
      height: 34px; /* Mantive 2 linhas de texto */
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .availability {
      /* Estilo centralizado para a disponibilidade */
      font-size: 11px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .size-selector { 
      display: flex; 
      gap: 6px; /* Espaço menor entre os tamanhos */
      margin-bottom: 15px; 
      justify-content: flex-start;
    }

    .footer-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #222;
      padding-top: 12px;
      margin-top: auto; /* IMPORTANTE: Empurra o preço e o botão sempre para o rodapé */

      .price { 
        color: #fff; 
        font-weight: 800; /* Mais peso na fonte */
        font-size: 1.3rem; /* Preço maior */
      }
    }
  }
`;

export const SizeBadge = styled.button<{ $active: boolean }>`
  /* Cores Amarelo e Preto do Admin */
  background: ${props => props.$active ? '#ffcc00' : '#111'};
  color: ${props => props.$active ? '#000' : '#aaa'};
  border: 1px solid ${props => props.$active ? '#ffcc00' : '#2a2a2a'};
  padding: 3px 9px;
  border-radius: 5px;
  font-size: 0.7rem;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: #ffcc00;
    background: ${props => props.$active ? '#ffcc00' : '#1a1a1a'};
    color: ${props => props.$active ? '#000' : '#fff'};
  }
  
  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
`;

export const AddButton = styled.button`
  /* Botão Amarelo/Preto do Admin */
  background: #ffcc00; 
  color: #000; 
  border: none;
  padding: 8px 14px;
  border-radius: 7px;
  font-size: 0.85rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) { 
    background: #e6b800; 
    transform: scale(1.03); /* Leve pulso no hover */
  }
  
  &:disabled { 
    background: #333;
    color: #666;
    cursor: not-allowed; 
  }
`;

export const ImageModalOverlay = styled.div<{ $active: boolean }>`
  display: ${props => (props.$active ? 'flex' : 'none')};
  position: fixed;
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0;
  background: rgba(0, 0, 0, 0.96);
  z-index: 9999;
  align-items: center;
  justify-content: center;
  padding: 20px;

  img {
    max-width: 95%;
    max-height: 95vh;
    border-radius: 12px;
    border: 1px solid #333;
    box-shadow: 0 0 50px rgba(0,0,0,0.9);
  }
`;