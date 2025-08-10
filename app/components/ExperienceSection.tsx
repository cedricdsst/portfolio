'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const ExperienceSection = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    const { t } = useLanguage()
    const experiences = t.experience.jobs

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

                {/* Professional experiences */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >

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
            </div>
        </section>
    )
}

export default ExperienceSection 