// app/layout.tsx
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { AosInit } from "./_components/aos-init"
import { ParallaxWrapper } from "./_components/ParallaxWrapper"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Jessica Natalia | Personal Trainer & Consultoria",
  description: "Treinamento personalizado e consultoria online de alta performance com Jessica Natalia. Alcance sua melhor versão.",
  icons: {
    icon: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${outfit.variable} font-sans antialiased`}>
        <ParallaxWrapper>
          {children}
          <AosInit />
        </ParallaxWrapper>
      </body>
    </html>
  )
}
