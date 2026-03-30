import { type ReactNode } from 'react';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';
import * as S from './styles';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <S.Container>
      <Header />
      <Sidebar />
      <S.Content>
        {children}
      </S.Content>
      <Footer />
    </S.Container>
  );
}