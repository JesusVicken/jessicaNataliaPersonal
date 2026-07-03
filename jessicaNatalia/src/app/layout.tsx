// app/layout.tsx
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { AosInit } from "./_components/aos-init"
import { ParallaxWrapper } from "./_components/ParallaxWrapper"
import { CustomCursor } from "./_components/custom-cursor"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Jessica Natalia | Personal Trainer & Consultoria",
  description: "Treinamento personalizado e consultoria online de alta performance com Jessica Natalia. Alcance sua melhor versão.",
  icons: {
    icon: "/icon.jpeg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${outfit.variable} font-sans antialiased`}>
        <CustomCursor />
        <ParallaxWrapper>
          {children}
          <AosInit />
        </ParallaxWrapper>
      </body>
    </html>
  )
}
