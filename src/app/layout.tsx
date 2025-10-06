import type { Metadata } from "next";
import { Montserrat,  } from "next/font/google";
import "./globals.css";

const geistMontserrat = Montserrat({
  variable: "--font-geist-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlavorAI",
  description: "AI-powered flavor and recipe generator",
  keywords: ["AI", "flavor", "recipe", "generator"],
  authors: [{ name: "OstapoKapo"}],
  icons: {
    icon: "/icons/favicon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMontserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
