import { ReactNode } from 'react';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="relative min-h-screen bg-background font-sans antialiased">
      <Header />
      <main className="relative flex-1">{children}</main>
      <Footer />
    </div>
  );
}
