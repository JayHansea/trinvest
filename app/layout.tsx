import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const mt = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trinvest - Cryptocurrency Investment Platform",
  description: "A cryptocurrency invesstment platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mt.className}>{children}</body>
    </html>
  );
}
