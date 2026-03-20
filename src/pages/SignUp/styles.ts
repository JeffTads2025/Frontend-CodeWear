import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #020617; /* Fundo escuro igual ao seu sistema */
`;

export const Content = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const LogoSection = styled.div`
  text-align: center;
  
  .icon-box {
    background: var(--primary); /* Usa a cor azul que definimos no global */
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    color: white;
    font-size: 28px;
  }

  h1 {
    color: white;
    font-size: 32px;
    letter-spacing: -1px;
  }

  p {
    color: #94a3b8;
    margin-top: 8px;
  }
`;

export const FormCard = styled.form`
  background: #1e293b;
  padding: 40px;
  border-radius: 16px;
  border: 1px solid #334155;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);

  h2 {
    color: white;
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      color: #94a3b8;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    input {
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 12px;
      color: white;
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
    background: var(--primary);
    color: white;
    border: none;
    padding: 14px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
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
    color: #94a3b8;
    text-decoration: none;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 10px;
    transition: color 0.2s;

    &:hover {
      color: white;
    }
  }
`;