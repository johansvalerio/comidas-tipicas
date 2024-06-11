import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Menu from "./components/Navbar"
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EL TAMALITO",
  description: "Tamales con el mejor sabor guanacasteco",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <Menu />
        </header>
        
        <main>
          {children}
        </main>
        
        <footer id='footer' className='bg-choco-400'>
        <Footer />
      </footer>
      </body>
    </html>
  );
}
