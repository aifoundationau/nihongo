import { Shippori_Mincho, Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/components/AppProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoModal from '@/components/VideoModal';
import TokenStore from '@/components/TokenStore';

const mincho = Shippori_Mincho({ weight: ['500', '700', '800'], subsets: ['latin'], variable: '--font-mincho' });
const sans = Noto_Sans_JP({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: 'Nihongo Kyoushitsu · 日本語教室',
  description: 'Bite-sized Japanese lessons. Every video costs 1 token (US$1). Founded by David Robertson, AI Foundation.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${mincho.variable} ${sans.variable}`}>
        <AppProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <VideoModal />
          <TokenStore />
        </AppProvider>
      </body>
    </html>
  );
}
