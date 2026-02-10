import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticleBySlug, getAllArticles } from '@/lib/articles'
import { ArrowLeft, Calendar } from 'lucide-react'
import Navigation from '@/app/components/Navigation'
import Footer from '@/app/components/Footer'

interface ArticlePageProps {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    const articles = await getAllArticles()
    return articles.map((article) => ({
        slug: article.slug,
    }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const article = await getArticleBySlug(params.slug)
    
    if (!article) {
        return {
            title: 'Article non trouvé',
        }
    }

    return {
        title: `${article.title} | Blog IA Cédric DOUSSET`,
        description: article.excerpt,
        keywords: [...article.tags, 'IA', 'intelligence artificielle', 'blog tech'],
        alternates: {
            canonical: `https://cedricdousset.dev/blog/${article.slug}`,
        },
        openGraph: {
            title: article.title,
            description: article.excerpt,
            type: 'article',
            url: `https://cedricdousset.dev/blog/${article.slug}`,
            publishedTime: article.publishedAt,
            authors: ['Cédric DOUSSET'],
            tags: article.tags,
        },
    }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const article = await getArticleBySlug(params.slug)

    if (!article) {
        notFound()
    }

    // Schema.org Article
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.excerpt,
        url: `https://cedricdousset.dev/blog/${article.slug}`,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt || article.publishedAt,
        author: {
            '@type': 'Person',
            name: 'Cédric DOUSSET',
            url: 'https://cedricdousset.dev',
            sameAs: [
                'https://github.com/cedricdsst',
                'https://www.linkedin.com/in/c%C3%A9dric-dousset-951110210/',
            ],
        },
        publisher: {
            '@type': 'Person',
            name: 'Cédric DOUSSET',
            url: 'https://cedricdousset.dev',
        },
        keywords: article.tags.join(', '),
        articleSection: 'Intelligence Artificielle',
        inLanguage: 'fr-FR',
    }

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Accueil',
                item: 'https://cedricdousset.dev',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: 'https://cedricdousset.dev/blog',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: article.title,
                item: `https://cedricdousset.dev/blog/${article.slug}`,
            },
        ],
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Navigation />
            <main className="min-h-screen bg-dark-900 pt-20">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Back Link */}
                    <Link 
                        href="/blog" 
                        className="inline-flex items-center text-gray-400 hover:text-accent transition-colors mb-8"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Retour au blog
                    </Link>

                    {/* Header */}
                    <header className="mb-12">
                        <div className="flex items-center gap-2 mb-4">
                            <Calendar size={18} className="text-accent" />
                            <time dateTime={article.publishedAt} className="text-gray-400">
                                {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </time>
                        </div>
                        
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                            {article.title}
                        </h1>
                    </header>

                    {/* Content */}
                    <div 
                        className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-accent hover:prose-a:text-accent/80"
                        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
                    />

                    {/* Author Box */}
                    <div className="mt-16 p-6 glass rounded-xl border border-accent/20">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent text-2xl font-bold">
                                CD
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Cédric DOUSSET</h3>
                                <p className="text-gray-300">
                                    Développeur Web & Intelligence Artificielle
                                </p>
                            </div>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </>
    )
}
