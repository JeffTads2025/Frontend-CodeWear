import styled from 'styled-components';

export const ProductCard = styled.div`
  background: #161616;
  border-radius: 12px;
  border: 1px solid #222;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  height: 460px;

  &:hover {
    transform: translateY(-5px);
    border-color: #ffcc00;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  }

  .image-container {
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
    transform: scale(1.08);
  }

  .content {
    padding: 15px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    h3 {
      color: #fff;
      font-size: 1.05rem;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 700;
    }

    .description {
      color: #999;
      font-size: 0.8rem;
      margin-bottom: 12px;
      line-height: 1.4;
      height: 34px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .availability {
      font-size: 11px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .size-selector {
      display: flex;
      gap: 6px;
      margin-bottom: 15px;
      justify-content: flex-start;
    }

    .footer-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #222;
      padding-top: 12px;
      margin-top: auto;

      .price {
        color: #fff;
        font-weight: 800;
        font-size: 1.3rem;
      }
    }
  }
`;

export const AddButton = styled.button`
  background: #ffcc00;
  color: #000;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: bold;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background: #e6b800;
    transform: scale(1.05);
  }

  &:disabled {
    background: #333;
    color: #666;
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
