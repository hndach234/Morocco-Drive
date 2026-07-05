import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Widgets } from "@/components/widgets";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Morocco Drive - Location de Voitures Premium au Maroc",
  description: "Louez des véhicules d'exception au Maroc. Service premium, assistance 24/7, agences à Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir, Oujda et Nador.",
  keywords: ["location de voiture maroc", "louer voiture casablanca", "location voiture luxe marrakech", "morocco drive", "car rental morocco"],
  openGraph: {
    title: "Morocco Drive - Location de Voitures Premium au Maroc",
    description: "Louez des véhicules d'exception au Maroc. Service premium, assistance 24/7, agences dans tout le Royaume.",
    type: "website",
    locale: "fr_MA",
    url: "https://www.moroccodrive.com",
    siteName: "Morocco Drive",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-light-bg text-brand-blue dark:bg-dark-bg dark:text-white transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Header />
          <main className="flex-grow pt-20 lg:pt-24">
            {children}
          </main>
          <Footer />
          <Widgets />
        </ThemeProvider>
      </body>
    </html>
  );
}

