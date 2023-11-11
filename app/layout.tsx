import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import SessionProvider from '@/providers/session-provider';
import ToasterProvider from '@/providers/toaster-provider';

// const inter = Inter({ subsets: ['latin'] });
const CircularStd = localFont({
  src: [
    {
      path: '../public/fonts/CircularStd-Book.woff2',
    },
  ],
  variable: '--font-circular-std',
});

export const metadata: Metadata = {
  title: 'Next Template',
  description: 'Templates for Next.js Assembled By Naor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={CircularStd.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
