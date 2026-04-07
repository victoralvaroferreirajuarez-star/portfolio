import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alvaro Ferreira · avalito",
  description:
    "Portfolio de Alvaro Ferreira — Desarrollador de software especializado en automatización, IA y soluciones digitales para negocios.",
  keywords: [
    "Alvaro Ferreira",
    "avalito",
    "desarrollador",
    "portfolio",
    "Next.js",
    "automatización",
    "chatbot",
    "WhatsApp bot",
    "IA",
  ],
  authors: [{ name: "Alvaro Ferreira" }],
  creator: "Alvaro Ferreira",
  metadataBase: new URL("https://avalito.dev"),
  openGraph: {
    title: "Alvaro Ferreira · avalito",
    description:
      "Desarrollador de software — Automatización, IA y soluciones digitales.",
    type: "website",
    locale: "es_UY",
    alternateLocale: "en_US",
    siteName: "avalito",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alvaro Ferreira · avalito",
    description:
      "Desarrollador de software — Automatización, IA y soluciones digitales.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alvaro Ferreira",
  alternateName: "avalito",
  url: "https://avalito.dev",
  jobTitle: "Software Developer",
  knowsAbout: ["Web Development", "Automation", "AI", "Chatbots"],
  sameAs: [
    "https://github.com/victoralvaroferreirajuarez-star",
    "https://www.linkedin.com/in/victor-alvaro-ferreira-juarez-321970322/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={geist.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-to-content">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
