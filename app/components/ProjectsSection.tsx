'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, FolderOpen } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const ProjectsSection = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
    const { t, language } = useLanguage()

    type BaseProject = typeof t.experience.projects[number]
    type ProjectCard = {
        title: string
        description: string
        image?: string
        video?: string
        technologies: string[]
        features: string[]
        link?: string
        github?: string
    }

    const projects: ProjectCard[] = t.experience.projects.map((p: BaseProject) => ({
        title: String(p.title),
        description: String(p.description),
        technologies: [...p.technologies].map(String),
        features: [...p.features].map(String),
    }))

    // Inject real OrderAI project as first card
    if (projects.length > 0) {
        const common = {
            technologies: ['Next.js', 'OpenAI API', 'TypeScript', 'Tailwind', 'Vercel'],
            link: 'https://order-ai-v3.vercel.app/',
            github: 'https://github.com/cedricdsst/orderAI',
            image: '/projects/orderai.png',
            video: '/projects/orderai.mp4',
        }
        const frProject: ProjectCard = {
            title: 'OrderAI',
            description: "Application Next.js simulant une prise de commande en drive-through pilotée par l'IA.",
            features: [
                '🌐 Bilingue (FR/EN) avec sélection au démarrage',
                '🔒 Anti-hallucination (validation stricte côté serveur)',
                '✅ Détection intelligente de fin de commande',
            ],
            ...common,
        }
        const enProject: ProjectCard = {
            title: 'OrderAI',
            description: 'Next.js app simulating an AI-powered drive-through ordering flow.',
            features: [
                '🌐 Bilingual (FR/EN) with language selection at start',
                '🔒 Anti-hallucination (strict server-side validation)',
                '✅ Smart end-of-order detection',
            ],
            ...common,
        }
        projects[0] = language === 'fr' ? frProject : enProject
    }

    return (
        <section id="projects" className="py-20 bg-dark-900 relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-20 right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent/10 rounded-full blur-2xl animate-pulse-slow delay-2000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="gradient-text" suppressHydrationWarning>{t.nav.projects}</span>
                    </h2>
                    <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
                    <p className="text-gray-300 text-xl max-w-3xl mx-auto" suppressHydrationWarning>
                        {language === 'fr'
                            ? 'Projets qui illustrent ma passion pour l\'innovation technologique'
                            : 'Projects that showcase my passion for technological innovation'}
                    </p>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="glass rounded-xl border border-white/10 hover:border-accent/30 transition-all duration-300 overflow-hidden group"
                                onMouseEnter={(e) => {
                                    const video = e.currentTarget.querySelector('video') as HTMLVideoElement | null
                                    if (video) {
                                        try {
                                            video.currentTime = 0
                                            if (video.paused) void video.play()
                                        } catch { }
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    const video = e.currentTarget.querySelector('video') as HTMLVideoElement | null
                                    if (video) {
                                        try {
                                            video.pause()
                                            video.currentTime = 0
                                        } catch { }
                                    }
                                }}
                            >
                                <div className="aspect-video relative bg-dark-900/40 overflow-hidden">
                                    {project.image ? (
                                        <>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                                            />
                                            {project.video && (
                                                <video
                                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                                                    src={project.video}
                                                    muted
                                                    playsInline
                                                    autoPlay
                                                    loop
                                                    preload="auto"
                                                    aria-label={`${project.title} demo video`}
                                                    onCanPlay={(e) => {
                                                        const v = e.currentTarget
                                                        if (v.paused) v.play().catch(() => { })
                                                    }}
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <div className="h-full w-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                                            <div className="text-accent/60 text-6xl">🚀</div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <h4 className="text-xl font-bold text-white mb-3">{project.title}</h4>
                                    <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>

                                    {project.features && project.features.length > 0 && (
                                        <div className="mb-4">
                                            <h5 className="text-white font-semibold mb-2" suppressHydrationWarning>
                                                {language === 'fr' ? 'Fonctionnalités :' : 'Features:'}
                                            </h5>
                                            <ul className="space-y-1">
                                                {project.features.map((feature, featureIndex) => (
                                                    <li key={featureIndex} className="flex items-start gap-2 text-gray-300 text-sm">
                                                        <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech) => (
                                            <span key={tech} className="px-2 py-1 bg-dark-700 border border-gray-600 rounded text-accent text-xs">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-3">
                                        <motion.a
                                            href={project.link ?? '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-accent text-dark-900 font-semibold rounded-lg hover:bg-accent/90 transition-colors duration-300 text-sm"
                                        >
                                            <ExternalLink size={16} />
                                            {t.experience.demo}
                                        </motion.a>
                                        <motion.a
                                            href={project.github ?? '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-accent text-accent rounded-lg hover:bg-accent/10 transition-colors duration-300 text-sm"
                                        >
                                            {t.experience.code}
                                        </motion.a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-10 flex items-center justify-center gap-4">
                        <p className="text-gray-300 text-sm sm:text-base">
                            {language === 'fr' ? 'Plus de projets disponibles sur mon ' : 'More projects available on my '}
                            <a href="https://github.com/cedricdsst" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                GitHub
                            </a>
                        </p>
                        <motion.a
                            href="https://github.com/cedricdsst"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 bg-dark-700 border border-gray-600 rounded-lg text-gray-400 hover:text-accent hover:border-accent/50 transition-all duration-300"
                            aria-label="GitHub"
                        >
                            <Github size={20} />
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default ProjectsSection


