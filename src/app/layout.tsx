import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BicesterBUG - Bicester Leisure Routes",
  description: "Documentation site and API for the Bicester Open Source Leisure Routes project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
        <h1>Bicester Leisure Routes Documentation</h1>
        {children}
        </div>
       
        </body>
    </html>
  );
}
