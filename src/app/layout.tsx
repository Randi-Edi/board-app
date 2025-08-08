import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // choose what you need
  display: 'swap',
  variable: '--font-geist-sans', // store in a CSS variable
})


export const metadata: Metadata = {
  title: 'Board App',
  description: 'Project management board',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body

        className={`antialiased min-h-screen ${poppins.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
