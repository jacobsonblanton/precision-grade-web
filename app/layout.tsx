import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Precision Grade Dashboard',
  description: 'LBX Precision Grade machine management for dealers and trainers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('pg-theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
