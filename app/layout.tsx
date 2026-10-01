import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'REMO — Together, We Grow.', description: 'REMO team website' };

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="ko"><body>{children}</body></html>
}
