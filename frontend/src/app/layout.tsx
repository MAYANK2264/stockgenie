import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TradeGenie - AI-Powered Stock Analysis & Trading',
  description: 'AI-powered stock analysis and automated paper trading platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
          <nav className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <div className="p-4">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">TradeGenie</h1>
            </div>
            <div className="space-y-1 p-2">
              {[
                { name: 'Dashboard', href: '/dashboard' },
                { name: 'Market', href: '/market' },
                { name: 'Upload', href: '/upload' },
                { name: 'Predictions', href: '/predictions' },
                { name: 'Trading', href: '/trading' },
                { name: 'Settings', href: '/settings' },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
