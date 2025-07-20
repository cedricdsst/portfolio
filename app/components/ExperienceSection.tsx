'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, FolderOpen, ExternalLink, Calendar, MapPin } from 'lucide-react'

const ExperienceSection = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    const experiences = [
        {
            company: "Tech Innovation Lab",
            position: "Développeur Full-Stack IA",
            location: "Paris, France",
            period: "2023 - Présent",
            description: "Développement d'applications web intégrant des modèles d'IA pour l'automatisation des processus métier. Mise en place d'architectures scalables et optimisation des performances.",
            achievements: [
                "Réduction de 40% du temps de traitement grâce à l'intégration d'IA",
                "Développement d'un chatbot intelligent avec 95% de satisfaction client",
                "Migration vers une architecture microservices"
            ],
            technologies: ["React", "Next.js", "Python", "OpenAI API", "Docker"]
        },
        {
            company: "Digital Solutions",
            position: "Développeur Frontend Senior",
            location: "Lyon, France",
            period: "2021 - 2023",
            description: "Conception et développement d'interfaces utilisateur modernes pour des applications web complexes. Encadrement d'une équipe de 3 développeurs juniors.",
            achievements: [
                "Amélioration de 60% des métriques UX",
                "Mise en place d'un design system complet",
                "Formation et mentoring de développeurs juniors"
            ],
            technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js"]
        }
    ]

    const projects = [
        {
            title: "AI Content Generator",
            description: "Plateforme de génération de contenu intelligent utilisant GPT-4 pour créer du contenu optimisé SEO.",
            image: "/api/placeholder/400/250",
            technologies: ["Next.js", "OpenAI API", "Prisma", "PostgreSQL"],
            features: [
                "Génération automatique d'articles",
                "Optimisation SEO intelligente",
                "Interface utilisateur intuitive",
                "Dashboard analytique"
            ],
            link: "#",
            github: "#"
        },
        {
            title: "Smart Analytics Dashboard",
            description: "Dashboard d'analyse prédictive utilisant l'IA pour identifier les tendances et anomalies dans les données.",
            image: "/api/placeholder/400/250",
            technologies: ["React", "Python", "TensorFlow", "D3.js"],
            features: [
                "Analyse prédictive en temps réel",
                "Détection d'anomalies automatique",
                "Visualisations interactives",
                "Alertes intelligentes"
            ],
            link: "#",
            github: "#"
        },
        {
            title: "E-commerce AI Recommender",
            description: "Système de recommandation intelligent pour plateforme e-commerce basé sur l'analyse comportementale.",
            image: "/api/placeholder/400/250",
            technologies: ["Vue.js", "Node.js", "MongoDB", "TensorFlow"],
            features: [
                "Recommandations personnalisées",
                "Analyse comportementale",
                "A/B testing intégré",
                "Performance optimisée"
            ],
            link: "#",
            github: "#"
        }
    ]

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
                        <span className="gradient-text">Expérience</span>
                    </h2>
                    <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
                    <p className="text-gray-300 text-xl max-w-3xl mx-auto">
                        Parcours professionnel et projets qui illustrent ma passion pour l&apos;innovation technologique
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
                        Expériences Professionnelles
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

                                        <h5 className="text-white font-semibold mb-3">Réalisations clés :</h5>
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
                        Projets Personnels
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
                                <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                                    <div className="text-accent/60 text-6xl">🚀</div>
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
                                            href={project.link}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-accent text-dark-900 font-semibold rounded-lg hover:bg-accent/90 transition-colors duration-300 text-sm"
                                        >
                                            <ExternalLink size={16} />
                                            Demo
                                        </motion.a>
                                        <motion.a
                                            href={project.github}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-accent text-accent rounded-lg hover:bg-accent/10 transition-colors duration-300 text-sm"
                                        >
                                            Code
                                        </motion.a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default ExperienceSection 