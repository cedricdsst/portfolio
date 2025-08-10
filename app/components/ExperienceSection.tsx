'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, FolderOpen, ExternalLink, Calendar, MapPin, Github } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const ExperienceSection = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    const { t, language } = useLanguage()
    const experiences = t.experience.jobs

    type BaseProject = typeof t.experience.projects[number]
    type ProjectCard = {
        title: string
        description: string
        image?: string
        technologies: string[]
        features: string[]
        link?: string
        github?: string
    }

    const projects: ProjectCard[] = t.experience.projects.map((p: BaseProject) => ({
        title: String(p.title),
        description: String(p.description),
        technologies: [...p.technologies].map(String),
        features: [...p.features].map(String)
    }))

    // Override first placeholder with real project: OrderAI Drive-Through
    if (projects.length > 0) {
        const frProject: ProjectCard = {
            title: 'OrderAI',
            description:
                "Application Next.js simulant une prise de commande en drive-through pilotée par l'IA.",
            technologies: ['Next.js', 'OpenAI API', 'TypeScript', 'Tailwind', 'Vercel'],
            features: [
                '🌐 Bilingue (FR/EN) avec sélection au démarrage',
                '🔒 Anti-hallucination (validation stricte côté serveur)',
                '✅ Détection intelligente de fin de commande',
            ],
            link: 'https://order-ai-v3.vercel.app/',
            github: 'https://github.com/cedricdsst/orderAI',
            image: '/projects/orderai.png',
        }

        const enProject: ProjectCard = {
            title: 'OrderAI',
            description:
                "Next.js app simulating an AI-powered drive-through ordering flow.",
            technologies: ['Next.js', 'OpenAI API', 'TypeScript', 'Tailwind', 'Vercel'],
            features: [
                '🌐 Bilingual (FR/EN) with language selection at start',
                '🔒 Anti-hallucination (strict server-side validation)',
                '✅ Smart end-of-order detection',
            ],
            link: 'https://order-ai-v3.vercel.app/',
            github: 'https://github.com/cedricdsst/orderAI',
            image: '/projects/orderai.png',
        }

        projects[0] = language === 'fr' ? frProject : enProject
    }

    return (
        <section id="experience" className="py-20 bg-dark-800 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
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
                        <span className="gradient-text" suppressHydrationWarning>{t.experience.title}</span>
                    </h2>
                    <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
                    <p className="text-gray-300 text-xl max-w-3xl mx-auto" suppressHydrationWarning>
                        {t.experience.blurb}
                    </p>
                </motion.div>

                {/* Expériences professionnelles */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-20"
                >
                    <h3 className="text-2xl font-bold text-center mb-12 flex items-center justify-center gap-3">
                        <Briefcase className="w-8 h-8 text-accent" />
                        <span suppressHydrationWarning>{t.experience.jobsTitle}</span>
                    </h3>

                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                                className="glass p-8 rounded-xl border border-white/10 hover:border-accent/30 transition-all duration-300"
                            >
                                <div className="grid lg:grid-cols-3 gap-6">
                                    <div className="lg:col-span-1">
                                        <h4 className="text-xl font-bold text-white mb-2">{exp.position}</h4>
                                        <p className="text-accent font-semibold mb-2">{exp.company}</p>

                                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                                            <MapPin size={16} />
                                            {exp.location}
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                                            <Calendar size={16} />
                                            {exp.period}
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {exp.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2 py-1 bg-dark-700 border border-gray-600 rounded text-accent text-xs"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="lg:col-span-2">
                                        <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                                        <h5 className="text-white font-semibold mb-3">{t.experience.achievementsTitle}</h5>
                                        <ul className="space-y-2">
                                            {exp.achievements.map((achievement, achIndex) => (
                                                <li key={achIndex} className="flex items-start gap-2 text-gray-300">
                                                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                                                    {achievement}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Projets personnels */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <h3 className="text-2xl font-bold text-center mb-12 flex items-center justify-center gap-3">
                        <FolderOpen className="w-8 h-8 text-accent" />
                        <span suppressHydrationWarning>{t.experience.projectsTitle}</span>
                    </h3>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="glass rounded-xl border border-white/10 hover:border-accent/30 transition-all duration-300 overflow-hidden group"
                            >
                                <div className="aspect-video bg-dark-900/40 overflow-hidden">
                                    {project.image ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="h-full w-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                                            <div className="text-accent/60 text-6xl">🚀</div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <h4 className="text-xl font-bold text-white mb-3">{project.title}</h4>
                                    <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>

                                    <div className="mb-4">
                                        <h5 className="text-white font-semibold mb-2">Fonctionnalités :</h5>
                                        <ul className="space-y-1">
                                            {project.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-start gap-2 text-gray-300 text-sm">
                                                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 bg-dark-700 border border-gray-600 rounded text-accent text-xs"
                                            >
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

                    {/* More projects on GitHub */}
                    <div className="mt-10 flex items-center justify-center gap-4">
                        <p className="text-gray-300 text-sm sm:text-base">
                            {language === 'fr' ? 'Plus de projets disponibles sur mon ' : 'More projects available on my '}
                            <a
                                href="https://github.com/cedricdsst"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:underline"
                            >
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

export default ExperienceSection 