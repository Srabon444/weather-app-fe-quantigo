import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import ReactQueryProvider from '@/providers/query-client-provider';
import { Toaster } from '@/components/ui/sonner';

const dmSans = DM_Sans({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Weather Now',
  description:
    'A real-time weather-app using open weather data API to provide accurate and up-to-date weather information for any location worldwide.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Weather Now</title>
      </head>
      <body className={dmSans.className}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}