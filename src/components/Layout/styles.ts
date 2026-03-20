import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: var(--background);
  overflow: hidden;
`;

export const Content = styled.main`
  flex: 1;
  padding: 40px;
  overflow-y: auto;
  background-color: var(--background);
`;