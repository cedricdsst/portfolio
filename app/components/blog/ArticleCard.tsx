'use client'

import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { Article } from '@/lib/articles'

interface ArticleCardProps {
    article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
    return (
        <article className="glass rounded-xl overflow-hidden border border-white/10 hover:border-accent/50 transition-all duration-300 group">
            <Link href={`/blog/${article.slug}`}>
                <div className="p-6">
                    {/* Title - no hover color change */}
                    <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
                        {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                        {article.excerpt}
                    </p>

                    {/* Meta - date only */}
                    <div className="flex items-center justify-between text-gray-400 text-sm">
                        <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'short',
                            })}
                        </span>

                        <span className="text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                            Lire
                            <ArrowRight size={16} />
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    )
}
