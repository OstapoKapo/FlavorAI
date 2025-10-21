import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { QueryClientProviderWrapper } from "./components/layout/queryClient";
import { Header } from "./components/layout/header";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "FlavorAI",
  description: "create or find recipes based on ingredients you have",
  keywords: ["AI", "recipes", "ingredients"],
  icons: {
    icon: "/icons/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <QueryClientProviderWrapper>
          <Header />
        {children}
         <Toaster position="top-right" reverseOrder={false} />
         </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
