import './globals.css';
import { Fredoka } from 'next/font/google';

const fredoka = Fredoka({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata = {
  title: 'Alejandro De La Mora | Resume',
  description: 'AI Solutions Architect and Senior Developer resume site.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={fredoka.className}>{children}</body>
    </html>
  );
}
