import { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'
import ArticleCard from '@/app/components/blog/ArticleCard'
import Navigation from '@/app/components/Navigation'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
    title: 'Blog IA | Veille Technologique Intelligence Artificielle',
    description: 'Veille hebdomadaire sur les nouvelles technologies IA : LLM, génération d\'images, vidéos, audio, agents autonomes. Découvrez les dernières avancées en intelligence artificielle.',
    keywords: ['blog IA', 'veille technologique', 'intelligence artificielle', 'LLM', 'machine learning', 'nouveautés IA 2026'],
    alternates: {
        canonical: 'https://cedricdousset.dev/blog',
    },
    openGraph: {
        title: 'Blog IA | Veille Technologique Intelligence Artificielle',
        description: 'Veille hebdomadaire sur les nouvelles technologies IA : LLM, images, vidéos, agents autonomes.',
        type: 'website',
        url: 'https://cedricdousset.dev/blog',
    },
}

export default async function BlogPage() {
    const articles = await getAllArticles()

    // Schema.org Blog
    const blogSchema = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Blog IA - Cédric DOUSSET',
        description: 'Veille technologique sur l\'intelligence artificielle',
        url: 'https://cedricdousset.dev/blog',
        author: {
            '@type': 'Person',
            name: 'Cédric DOUSSET',
            url: 'https://cedricdousset.dev',
        },
        blogPost: articles.map(article => ({
            '@type': 'BlogPosting',
            headline: article.title,
            url: `https://cedricdousset.dev/blog/${article.slug}`,
            datePublished: article.publishedAt,
            author: {
                '@type': 'Person',
                name: 'Cédric DOUSSET',
            },
        })),
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
            />
            <Navigation />
            <main className="min-h-screen bg-dark-900 pt-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="gradient-text">Blog IA</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Veille technologique hebdomadaire sur l'intelligence artificielle. 
                            Découvrez les dernières avancées en LLM, génération d'images, vidéos, 
                            et agents autonomes.
                        </p>
                    </div>

                    {/* Articles Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <ArticleCard key={article.slug} article={article} />
                        ))}
                    </div>

                    {/* Newsletter CTA */}
                    <div className="mt-20 text-center">
                        <div className="glass rounded-xl p-8 max-w-2xl mx-auto border border-accent/20">
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Recevez la veille IA chaque semaine
                            </h2>
                            <p className="text-gray-300 mb-6">
                                Inscrivez-vous à la newsletter pour recevoir un récapitulatif 
                                des nouveautés IA directement dans votre boîte mail.
                            </p>
                            <Link 
                                href="/newsletter" 
                                className="inline-block px-8 py-3 bg-accent text-dark-900 font-semibold rounded-lg hover:bg-accent/90 transition-colors"
                            >
                                S'inscrire à la newsletter
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
