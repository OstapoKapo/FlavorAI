import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const FontMontserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlavorAI",
  description: "AI-powered recipe generator",
  icons: {
    icon: "/icons/favicon.ico",
  },
  authors: [{ name: "OstapoKapo" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${FontMontserrat.variable} `}>
        {children}
      </body>
    </html>
  );
}
