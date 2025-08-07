'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Brain, Code, Zap } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const AboutSection = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    })

    return (
        <section id="about" className="py-20 bg-dark-800 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0">
                <div className="absolute top-10 right-10 w-40 h-40 bg-accent/5 rounded-full blur-2xl"></div>
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AboutContent />
            </div>
        </section>
    )
}

function AboutContent() {
    const { t } = useLanguage()
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    })

    return (
        <>
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    <span className="gradient-text" suppressHydrationWarning>{t.about.title}</span>
                </h2>
                <div className="w-20 h-1 bg-accent mx-auto"></div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Text content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-6"
                >
                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                        {t.about.passionTitle.split('innovation')[0]}
                        <span className="text-accent">innovation</span>
                    </h3>

                    <p className="text-gray-300 text-lg leading-relaxed">
                        {t.about.paragraph1}
                    </p>

                    <p className="text-gray-300 text-lg leading-relaxed">
                        {t.about.paragraph2}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        {['React', 'Next.js', 'TypeScript', 'Python', 'TensorFlow', 'OpenAI API'].map((tech) => (
                            <motion.span
                                key={tech}
                                whileHover={{ scale: 1.05 }}
                                className="px-4 py-2 bg-dark-700 border border-gray-600 rounded-full text-accent text-sm font-medium"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* Visual elements */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="grid grid-cols-1 gap-6"
                >
                    {[{ icon: Code, ...t.about.cards[0] }, { icon: Brain, ...t.about.cards[1] }, { icon: Zap, ...t.about.cards[2] }].map((item, index) => (
                        <motion.div
                            key={item.title}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="p-6 glass rounded-xl border border-white/10 hover:border-accent/50 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-2 bg-accent/10 rounded-lg">
                                    <item.icon className="w-6 h-6 text-accent" />
                                </div>
                                <h4 className="text-xl font-semibold text-white">{item.title}</h4>
                            </div>
                            <p className="text-gray-300 leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </>
    )
}

export default AboutSection 