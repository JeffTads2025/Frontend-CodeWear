import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  background: #0a0a0a;
  min-height: 100vh;
  color: #fff;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #333;

  .icon-bg {
    width: 60px;
    height: 60px;
    background: #ffcc00;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #000;
  }

  h2 {
    color: #fff;
    margin: 0;
    font-size: 2rem;
  }

  p {
    color: #999;
    margin: 5px 0 0 0;
    font-size: 1rem;
  }
`;

export const Content = styled.div`
  background: #161616;
  border-radius: 12px;
  padding: 30px;
  border: 1px solid #222;

  h3 {
    color: #ffcc00;
    margin-bottom: 15px;
    font-size: 1.2rem;
  }

  pre {
    color: #fff;
    font-family: 'Courier New', monospace;
  }
`;