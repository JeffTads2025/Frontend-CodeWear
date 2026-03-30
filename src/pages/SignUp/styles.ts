import styled from 'styled-components';

export const Container = styled.div`
  /* Garante que o fundo ocupe 100% da viewport e centralize o conteúdo */
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #020617; /* Fundo escuro uniforme */
  padding: 15px; /* Padding externo reduzido para telas menores */
  
  /* Remove scroll da página principal para fixar o formulário */
  overflow: hidden;

  @media (max-height: 700px) {
    /* Se a tela for muito baixa (ex: celular deitado), permite scroll para não cortar */
    overflow-y: auto;
    align-items: flex-start;
    padding-top: 20px;
  }
`;

export const Content = styled.div`
  width: 100%;
  /* Aumentamos a largura máxima para acomodar as 2 colunas */
  max-width: 700px;
  display: flex;
  flex-direction: column;
  /* Espaçamento entre o logo e o card reduzido para compactar */
  gap: 15px;
`;

export const LogoSection = styled.div`
  text-align: center;
  
  .icon-box {
    /* Cor e forma do ícone mantidos, mas em tamanho reduzido */
    background: var(--primary);
    width: 40px; /* Reduzido de 60px */
    height: 40px; /* Reduzido de 60px */
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 8px; /* Margem inferior reduzida */
    color: white;
    font-size: 20px;
  }

  h1 {
    color: white;
    font-size: 24px; /* Reduzido de 32px */
    margin: 0;
    letter-spacing: -1px;
  }

  p {
    color: #94a3b8;
    font-size: 13px; /* Reduzido de 16px */
    margin-top: 2px;
  }
`;

export const FormCard = styled.form`
  /* Fundo, borda e raio mantidos */
  background: #1e293b;
  border-radius: 16px;
  border: 1px solid #334155;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);

  /* Ativa o Grid System para 2 colunas */
  display: grid;
  grid-template-columns: 1fr 1fr; /* Duas colunas iguais */
  gap: 12px 20px; /* Espaço entre linhas (reduzido) e colunas */
  
  /* Padding interno compactado */
  padding: 24px 30px;

  h2 {
    /* O título ocupa as duas colunas */
    grid-column: 1 / -1;
    color: white;
    font-size: 20px; /* Reduzido de 24px */
    text-align: center;
    margin-bottom: 5px; /* Margem inferior reduzida */
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 6px; /* Espaço interno do grupo reduzido */

    /* Classe auxiliar para campos que devem ocupar a linha inteira */
    &.full-width {
      grid-column: 1 / -1;
    }

    label {
      color: #94a3b8;
      font-size: 12px; /* Reduzido de 14px */
      display: flex;
      align-items: center;
      gap: 6px;
    }

    input {
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 10px; /* Padding interno do input reduzido */
      color: white;
      font-size: 13px; /* Reduzido de 14px */
      outline: none;
      transition: border-color 0.2s;

      &::placeholder {
        color: #475569;
      }

      &:focus {
        border-color: var(--primary);
      }
    }
  }

  button {
    /* Botão ocupa a linha inteira */
    grid-column: 1 / -1;
    background: var(--primary); /* Azul mantido */
    color: white;
    border: none;
    padding: 12px; /* Reduzido de 14px */
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    font-size: 15px; /* Reduzido de 16px */
    margin-top: 10px; /* Margem superior reduzida */
    transition: filter 0.2s;

    &:hover {
      filter: brightness(1.2);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .back-link {
    /* Link ocupa a linha inteira */
    grid-column: 1 / -1;
    color: #94a3b8;
    text-decoration: none;
    font-size: 13px; /* Reduzido de 14px */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 8px; /* Margem superior reduzida */
    transition: color 0.2s;

    &:hover {
      color: white;
    }
  }

  /* Responsividade: Volta para uma coluna em telas de celular */
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 20px;
    
    .input-group {
      grid-column: 1 / -1;
    }
  }
`;