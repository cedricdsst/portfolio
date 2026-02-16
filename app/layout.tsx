import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from './i18n/LanguageContext'
import ScrollManager from './components/ScrollManager'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Cédric DOUSSET | Développeur Web & IA Freelance',
    description: 'Développeur web spécialisé en intelligence artificielle. Création d\'applications IA, chatbots, intégration OpenAI. Disponible pour projets freelance.',
    keywords: ['développeur web IA', 'intégration intelligence artificielle', 'freelance Next.js', 'Cédric DOUSSET', 'développeur React', 'expert OpenAI'],
    authors: [{ name: 'Cédric DOUSSET', url: 'https://www.linkedin.com/in/c%C3%A9dric-dousset-951110210/' }],
    viewport: 'width=device-width, initial-scale=1',
    robots: 'index, follow',
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-icon.png',
    },
    alternates: {
        canonical: 'https://cedricdousset.dev',
    },
    openGraph: {
        title: 'Cédric DOUSSET | Développeur Web & IA Freelance',
        description: 'Développeur web spécialisé en intelligence artificielle. Création d\'applications IA, chatbots, intégration OpenAI.',
        type: 'website',
        url: 'https://cedricdousset.dev',
        siteName: 'Cédric DOUSSET - Portfolio',
        locale: 'fr_FR',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Cédric DOUSSET | Développeur Web & IA Freelance',
        description: 'Développeur web spécialisé en intelligence artificielle. Applications IA, chatbots, intégration OpenAI.',
        creator: '@cedric_dsst',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Schema.org JSON-LD pour SEO
    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Cédric DOUSSET',
        jobTitle: 'Développeur Web & Intelligence Artificielle',
        url: 'https://cedricdousset.dev',
        sameAs: [
            'https://github.com/cedricdsst',
            'https://www.linkedin.com/in/c%C3%A9dric-dousset-951110210/',
            'https://x.com/cedric_dsst'
        ],
        knowsAbout: [
            'Développement Web',
            'Intelligence Artificielle',
            'Machine Learning',
            'Next.js',
            'React',
            'TypeScript',
            'OpenAI API'
        ],
        worksFor: {
            '@type': 'Organization',
            name: 'Freelance'
        },
        description: 'Développeur web spécialisé en intelligence artificielle freelance'
    }

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Cédric DOUSSET - Portfolio',
        url: 'https://cedricdousset.dev',
        description: 'Portfolio de Cédric DOUSSET, développeur web & IA freelance',
        author: {
            '@type': 'Person',
            name: 'Cédric DOUSSET'
        }
    }

    return (
        <html lang="fr" suppressHydrationWarning className="dark">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
                />
                <link rel="canonical" href="https://cedricdousset.dev" />
            </head>
            <body className={`${inter.className} bg-dark-900 text-white antialiased`}>
                <LanguageProvider>
                    <div className="relative min-h-screen">
                        {/* Background noise texture */}
                        <div className="fixed inset-0 bg-noise opacity-20 pointer-events-none"></div>

                        {/* Main content */}
                        <main className="relative z-10">
                            <ScrollManager />
                            {children}
                        </main>

                        {/* Floating elements for visual appeal */}
                        <div className="fixed top-20 left-20 w-32 h-32 bg-accent/5 rounded-full blur-xl pointer-events-none animate-pulse-slow"></div>
                        <div className="fixed bottom-20 right-20 w-24 h-24 bg-accent/10 rounded-full blur-xl pointer-events-none animate-pulse-slow delay-1000"></div>
                    </div>
                </LanguageProvider>
            </body>
        </html>
    )
} 