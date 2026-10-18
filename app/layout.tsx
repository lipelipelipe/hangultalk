import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#007AFF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'HangulTalk - Aprenda Coreano com Conversação',
  description: 'App estilo iOS nativo focado em conversação em coreano com ditado de voz e feedback de pronúncia em tempo real.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'HangulTalk',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'HangulTalk - Aprenda Coreano com Conversação',
    description: 'Pratique diálogos reais em coreano com áudio nativo e feedback de pronúncia em tempo real no iPhone.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HangulTalk - Aprenda Coreano com Conversação',
    description: 'Pratique diálogos reais em coreano com áudio nativo e feedback de pronúncia em tempo real no iPhone.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased select-none font-sans bg-[#F2F2F7] text-[#1C1C1E] dark:bg-[#000000] dark:text-[#F2F2F7]">
        {children}
      </body>
    </html>
  );
}
