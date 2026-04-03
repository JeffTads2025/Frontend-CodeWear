import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex; 
  align-items: center; 
  justify-content: center;
  background: #0a0a0a; /* Fundo padrão do seu site */
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
    background: #ffcc00; /* Amarelo Admin */
    width: 50px; 
    height: 50px;
    border-radius: 12px; 
    display: flex; 
    align-items: center; 
    justify-content: center;
    margin: 0 auto 16px; 
    color: #000; /* Ícone preto no fundo amarelo */
    font-size: 24px;
  }
  h1 { color: white; font-size: 32px; font-weight: 700; }
  p { color: #999; }
`;

export const FormCard = styled.form`
  background: #161616; /* Mesmo fundo do OrderCard/ProductCard */
  padding: 40px; 
  border-radius: 16px;
  border: 1px solid #222; /* Borda discreta */
  display: flex; 
  flex-direction: column; 
  gap: 20px;

  h2 { color: white; font-size: 24px; text-align: center; font-weight: 700; }

  .input-group {
    display: flex; 
    flex-direction: column; 
    gap: 8px;
    
    label { color: #666; font-size: 14px; display: flex; align-items: center; gap: 8px; font-weight: bold; }
    
    input {
      background: #0d0d0d; /* Fundo mais escuro para o input */
      border: 1px solid #2a2a2a; 
      border-radius: 8px;
      padding: 12px; 
      color: white; 
      outline: none;
      transition: 0.2s;
      
      &:focus { border-color: #ffcc00; }
    }
  }

  button {
    background: #ffcc00; /* Botão Amarelo */
    color: #000; /* Texto Preto */
    border: none; 
    padding: 14px;
    border-radius: 8px; 
    font-weight: 800; 
    cursor: pointer; 
    font-size: 16px;
    display: flex; 
    align-items: center; 
    justify-content: center; 
    gap: 8px;
    transition: 0.2s;
    
    &:hover:not(:disabled) { 
      background: #e6b800; 
      transform: scale(1.02);
    }
    
    &:disabled { 
      background: #333; 
      color: #666;
      opacity: 0.5; 
      cursor: not-allowed;
    }
  }

  .signup-text {
    text-align: center; 
    color: #999; 
    font-size: 14px;
    
    a { 
      color: #ffcc00; 
      text-decoration: none; 
      font-weight: bold; 
      
      &:hover { text-decoration: underline; } 
    }
  }
`;