import { type ReactNode } from 'react';
import { Sidebar } from '../Sidebar';
import { Container, Content } from './styles';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Container>
      <Sidebar />
      <Content>
        {children}
      </Content>
    </Container>
  );
}