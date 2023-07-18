import './globals.css'
import Header from '@/components/Header'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { Chakra_Petch } from 'next/font/google'
import { ToastifyProvider } from '@/components/Providers/ToastifyProvider'
import { ContextProvider } from '@/components/Providers/ContextProvider'
import { Metadata } from 'next'

const chakra_Petch = Chakra_Petch({
  subsets: ['latin'],
  weight: ['300', '500', '700'],
  display: 'swap'
})

const APP_NAME = "PortSync";
const APP_DESCRIPTION = "PortSync - Sistema de Gerenciamento.";

export const metadata: Metadata = {
  title: APP_NAME,
  applicationName: APP_NAME,
  description: APP_DESCRIPTION,
  generator: 'Next.js',
  manifest: "/manifest.json",
  keywords: ["renovato", "renovatt", "Wildemberg", "Wildemberg Renovato", "PortSync", "WillCode"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [{ name: 'renovatt' }, { name: 'renovatt', url: 'https://www.linkedin.com/in/renovatt/' }],
  viewport: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",

  openGraph: {
    type: "website",
    url: "https://portsync.vercel.app/",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
    images: [{
      url: "https://portsync.vercel.app/icon-512x512.png",
    }],
  },

  icons: [
    { rel: "apple-touch-icon", url: "/icon-192x192.png" },
    { rel: "icon", url: "/favicon.ico" },
  ],
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={chakra_Petch.className}>
        <ContextProvider>
          <ToastifyProvider>
            <Header />
            <Container>
              {children}
            </Container>
            <Footer />
          </ToastifyProvider>
        </ContextProvider>
      </body>
    </html>
  )
}
