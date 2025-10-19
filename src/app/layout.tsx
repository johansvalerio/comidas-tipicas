import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ServerNavbar from "./components/ServerNavbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EL TAMALITO",
  description: "Tamales con el mejor sabor guanacasteco",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <ServerNavbar />
        </header>

        <main>{children}</main>

        <footer id="footer">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
