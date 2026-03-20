import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex; align-items: center; justify-content: center;
  background: #020617;
`;

export const Content = styled.div`
  width: 100%; max-width: 400px; padding: 20px;
  display: flex; flex-direction: column; gap: 32px;
`;

export const LogoSection = styled.div`
  text-align: center;
  .icon-box {
    background: var(--primary); width: 50px; height: 50px;
    border-radius: 12px; display: flex; align-items: center; justify-content: center;
    margin: 0 auto 16px; color: white; font-size: 24px;
  }
  h1 { color: white; font-size: 32px; }
  p { color: #94a3b8; }
`;

export const FormCard = styled.form`
  background: #1e293b; padding: 40px; border-radius: 16px;
  border: 1px solid #334155; display: flex; flex-direction: column; gap: 20px;

  h2 { color: white; font-size: 24px; text-align: center; }

  .input-group {
    display: flex; flex-direction: column; gap: 8px;
    label { color: #94a3b8; font-size: 14px; display: flex; align-items: center; gap: 8px; }
    input {
      background: #0f172a; border: 1px solid #334155; border-radius: 8px;
      padding: 12px; color: white; outline: none;
      &:focus { border-color: var(--primary); }
    }
  }

  button {
    background: var(--primary); color: white; border: none; padding: 14px;
    border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 16px;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    &:hover { filter: brightness(1.1); }
    &:disabled { opacity: 0.5; }
  }

  .signup-text {
    text-align: center; color: #94a3b8; font-size: 14px;
    a { color: var(--primary); text-decoration: none; font-weight: bold; &:hover { text-decoration: underline; } }
  }
`;