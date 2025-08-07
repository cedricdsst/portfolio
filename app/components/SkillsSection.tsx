'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Code2, Database, Brain, Globe, Zap } from 'lucide-react'
import CustomRadarChart from './RadarChart'
import { useLanguage } from '../i18n/LanguageContext'

const SkillsSection = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    const { t } = useLanguage()
    const diplomas = t.skills.degrees

    const skillsData = [
        {
            category: t.skills.categories.frontend,
            icon: Globe,
            color: "from-blue-500 to-cyan-400",
            strokeColor: "rgb(59, 130, 246)", // blue-500
            fillColor: "rgba(59, 130, 246, 0.1)",
            data: [
                { skill: "React", value: 95, fullMark: 100 },
                { skill: "Next.js", value: 90, fullMark: 100 },
                { skill: "TypeScript", value: 88, fullMark: 100 },
                { skill: "Tailwind", value: 92, fullMark: 100 },
                { skill: "CSS/SCSS", value: 85, fullMark: 100 },
                { skill: "JavaScript", value: 90, fullMark: 100 }
            ]
        },
        {
            category: t.skills.categories.backend,
            icon: Database,
            color: "from-green-500 to-emerald-400",
            strokeColor: "rgb(34, 197, 94)", // green-500
            fillColor: "rgba(34, 197, 94, 0.1)",
            data: [
                { skill: "Node.js", value: 85, fullMark: 100 },
                { skill: "Python", value: 90, fullMark: 100 },
                { skill: "PostgreSQL", value: 80, fullMark: 100 },
                { skill: "MongoDB", value: 75, fullMark: 100 },
                { skill: "API REST", value: 88, fullMark: 100 },
                { skill: "GraphQL", value: 70, fullMark: 100 }
            ]
        },
        {
            category: t.skills.categories.ai,
            icon: Brain,
            color: "from-purple-500 to-pink-400",
            strokeColor: "rgb(168, 85, 247)", // purple-500
            fillColor: "rgba(168, 85, 247, 0.1)",
            data: [
                { skill: "OpenAI API", value: 92, fullMark: 100 },
                { skill: "TensorFlow", value: 78, fullMark: 100 },
                { skill: "Hugging Face", value: 85, fullMark: 100 },
                { skill: "LangChain", value: 88, fullMark: 100 },
                { skill: "PyTorch", value: 72, fullMark: 100 },
                { skill: "Machine Learning", value: 80, fullMark: 100 }
            ]
        },
        {
            category: t.skills.categories.devops,
            icon: Zap,
            color: "from-orange-500 to-red-400",
            strokeColor: "rgb(249, 115, 22)", // orange-500
            fillColor: "rgba(249, 115, 22, 0.1)",
            data: [
                { skill: "Docker", value: 82, fullMark: 100 },
                { skill: "Git", value: 95, fullMark: 100 },
                { skill: "AWS", value: 75, fullMark: 100 },
                { skill: "Vercel", value: 90, fullMark: 100 },
                { skill: "CI/CD", value: 78, fullMark: 100 },
                { skill: "Linux", value: 80, fullMark: 100 }
            ]
        }
    ]

    return (
        <section id="skills" className="py-20 bg-dark-900 relative overflow-hidden">
            {/* Background decorations */}
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
                        <span className="gradient-text" suppressHydrationWarning>{t.skills.title}</span>
                    </h2>
                    <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
                    <p className="text-gray-300 text-xl max-w-3xl mx-auto" suppressHydrationWarning>
                        {t.skills.blurb}
                    </p>
                </motion.div>

                {/* Diplômes */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-20"
                >
                    <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-3">
                        <GraduationCap className="w-8 h-8 text-accent" />
                        <span suppressHydrationWarning>{t.skills.degreesTitle}</span>
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {diplomas.map((diploma, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="glass p-6 rounded-xl border border-white/10 hover:border-accent/50 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h4 className="text-xl font-semibold text-white mb-1">{diploma.title}</h4>
                                        <p className="text-accent font-medium">{diploma.school}</p>
                                    </div>
                                    <motion.span
                                        whileHover={{ scale: 1.1 }}
                                        className="text-gray-400 text-sm bg-dark-700 px-3 py-1 rounded-full border border-gray-600"
                                    >
                                        {diploma.year}
                                    </motion.span>
                                </div>
                                <p className="text-gray-300 italic">{diploma.specialty}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Radar Charts */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <h3 className="text-2xl font-bold text-center mb-12 flex items-center justify-center gap-3">
                        <Code2 className="w-8 h-8 text-accent" />
                        <span suppressHydrationWarning>{t.skills.techTitle}</span>
                    </h3>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {skillsData.map((skillGroup, index) => (
                            <CustomRadarChart
                                key={skillGroup.category}
                                data={skillGroup.data}
                                color={skillGroup.color}
                                title={skillGroup.category}
                                icon={skillGroup.icon}
                                delay={index}
                                strokeColor={skillGroup.strokeColor}
                                fillColor={skillGroup.fillColor}
                            />
                        ))}
                    </div>
                </motion.div>


            </div>
        </section>
    )
}

export default SkillsSection 