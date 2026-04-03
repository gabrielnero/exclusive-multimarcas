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
    "Exclusive Multimarcas — sua revenda de confiança em Marau - RS. Seminovos com procedência garantida, financiamento facilitado e a melhor avaliação do seu usado. Volkswagen, Chevrolet, Fiat, Ford, Hyundai e muito mais.",
  keywords: [
    "carros seminovos marau",
    "revenda veículos marau rs",
    "exclusive multimarcas",
    "financiamento veículos marau",
    "comprar carro marau rs",
    "seminovos marau",
    "troca de carro marau",
    "volkswagen marau",
    "fiat marau",
    "exclusivemarau",
  ],
  authors: [{ name: "Exclusive Multimarcas" }],
  creator: "Exclusive Multimarcas",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://exclusivemultimarcas.vercel.app",
    siteName: "Exclusive Multimarcas",
    title: "Exclusive Multimarcas | Veículos Seminovos em Marau - RS",
    description:
      "Sua revenda de confiança em Marau - RS. Seminovos com procedência garantida, financiamento facilitado e atendimento diferenciado.",
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
