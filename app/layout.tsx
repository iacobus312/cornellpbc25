// app/layout.tsx
import './globals.css'; // or wherever you keep your global styles
import { ReactNode } from 'react';

export const metadata = {
  title: 'Clout Trader',
  description: 'Bet on influencer clout on Base',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
