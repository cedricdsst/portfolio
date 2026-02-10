import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export interface Article {
    slug: string
    title: string
    excerpt: string
    content: string
    contentHtml: string
    publishedAt: string
    updatedAt?: string
    readingTime: number
    tags: string[]
    author: string
}

const articlesDirectory = path.join(process.cwd(), 'content/articles')

export async function getAllArticles(): Promise<Article[]> {
    // Ensure directory exists
    if (!fs.existsSync(articlesDirectory)) {
        fs.mkdirSync(articlesDirectory, { recursive: true })
        return []
    }

    const fileNames = fs.readdirSync(articlesDirectory)
    const mdxFiles = fileNames.filter((name) => name.endsWith('.mdx') || name.endsWith('.md'))

    const articles = await Promise.all(
        mdxFiles.map(async (fileName) => {
            const slug = fileName.replace(/\.mdx?$/, '')
            const fullPath = path.join(articlesDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data, content } = matter(fileContents)

            // Calculate reading time
            const wordsPerMinute = 200
            const wordCount = content.split(/\s+/g).length
            const readingTime = Math.ceil(wordCount / wordsPerMinute)

            // Convert markdown to HTML
            const processedContent = await remark().use(html).process(content)
            const contentHtml = processedContent.toString()

            return {
                slug,
                title: data.title || slug,
                excerpt: data.excerpt || content.slice(0, 150) + '...',
                content,
                contentHtml,
                publishedAt: data.publishedAt || new Date().toISOString(),
                updatedAt: data.updatedAt,
                readingTime,
                tags: data.tags || [],
                author: data.author || 'Cédric DOUSSET',
            } as Article
        })
    )

    // Sort by date, newest first
    return articles.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    try {
        const fullPath = path.join(articlesDirectory, `${slug}.mdx`)
        
        // Try .mdx first, then .md
        let fileContents: string
        try {
            fileContents = fs.readFileSync(fullPath, 'utf8')
        } catch {
            const mdPath = path.join(articlesDirectory, `${slug}.md`)
            fileContents = fs.readFileSync(mdPath, 'utf8')
        }

        const { data, content } = matter(fileContents)

        const wordsPerMinute = 200
        const wordCount = content.split(/\s+/g).length
        const readingTime = Math.ceil(wordCount / wordsPerMinute)

        const processedContent = await remark().use(html).process(content)
        const contentHtml = processedContent.toString()

        return {
            slug,
            title: data.title || slug,
            excerpt: data.excerpt || content.slice(0, 150) + '...',
            content,
            contentHtml,
            publishedAt: data.publishedAt || new Date().toISOString(),
            updatedAt: data.updatedAt,
            readingTime,
            tags: data.tags || [],
            author: data.author || 'Cédric DOUSSET',
        }
    } catch (error) {
        return null
    }
}
