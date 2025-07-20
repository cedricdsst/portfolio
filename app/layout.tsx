import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Portfolio - Cédric DOUSSET - Développeur Web & IA',
    description: 'Portfolio moderne de Cédric DOUSSET, développeur web spécialisé en intégration d\'intelligence artificielle dans les applications web.',
    keywords: ['développeur web', 'intelligence artificielle', 'IA', 'NextJS', 'React', 'portfolio', 'Cédric DOUSSET'],
    authors: [{ name: 'Cédric DOUSSET' }],
    viewport: 'width=device-width, initial-scale=1',
    robots: 'index, follow',
    openGraph: {
        title: 'Portfolio - Cédric DOUSSET - Développeur Web & IA',
        description: 'Portfolio moderne de Cédric DOUSSET, développeur web spécialisé en intégration d\'intelligence artificielle.',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Portfolio - Cédric DOUSSET - Développeur Web & IA',
        description: 'Portfolio moderne de Cédric DOUSSET, développeur web spécialisé en intégration d\'intelligence artificielle.',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr" className="dark">
            <body className={`${inter.className} bg-dark-900 text-white antialiased`}>
                <div className="relative min-h-screen">
                    {/* Background noise texture */}
                    <div className="fixed inset-0 bg-noise opacity-20 pointer-events-none"></div>

                    {/* Main content */}
                    <main className="relative z-10">
                        {children}
                    </main>

                    {/* Floating elements for visual appeal */}
                    <div className="fixed top-20 left-20 w-32 h-32 bg-accent/5 rounded-full blur-xl pointer-events-none animate-pulse-slow"></div>
                    <div className="fixed bottom-20 right-20 w-24 h-24 bg-accent/10 rounded-full blur-xl pointer-events-none animate-pulse-slow delay-1000"></div>
                </div>
            </body>
        </html>
    )
} 