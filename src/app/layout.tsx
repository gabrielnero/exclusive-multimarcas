import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Exclusive Multimarcas | Veículos Seminovos em Marau - RS",
    template: "%s | Exclusive Multimarcas",
  },
  description:
    "Revenda de veículos seminovos em Marau - RS. Toyota, Volkswagen, Honda, Jeep, BMW e muito mais. Financiamento facilitado, troca avaliada e procedência garantida.",
  keywords: [
    "carros seminovos marau",
    "revenda veículos marau rs",
    "exclusive multimarcas",
    "financiamento veículos",
    "comprar carro marau",
  ],
  authors: [{ name: "Exclusive Multimarcas" }],
  creator: "Exclusive Multimarcas",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://exclusivemultimarcas.com.br",
    siteName: "Exclusive Multimarcas",
    title: "Exclusive Multimarcas | Veículos Seminovos em Marau - RS",
    description:
      "Revenda de veículos seminovos em Marau - RS. Financiamento facilitado, troca avaliada e procedência garantida.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
