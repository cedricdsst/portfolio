'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const HeroSection = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.25, 0.25, 0.75]
            }
        }
    }

    const scrollToAbout = () => {
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-2xl animate-pulse-slow delay-2000"></div>
            </div>

            <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="text-center z-10"
                >
                    <HeroContent itemVariants={itemVariants} />
                </motion.div>
            </div>
        </section>
    )
}

function HeroContent({ itemVariants }: { itemVariants: any }) {
    const { t } = useLanguage()
    const scrollToSection = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

    return (
        <>
            {/* Name */}
            <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    <span className="text-accent">{t.hero.name}</span>
                </h2>
            </motion.div>

            {/* Title AND Subtitle AND CTA Buttons AND Social Links combined */}
            <motion.div variants={itemVariants}>
                {/* Title */}
                <h1 className="mb-8 sm:mb-12">
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold gradient-text leading-tight block sm:inline">
                        {t.hero.titleMain}
                    </span>
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight block sm:inline sm:ml-4 mt-2 sm:mt-0">
                        {t.hero.titleAnd}
                    </span>
                </h1>

                {/* Subtitle */}
                <div className="mb-12 sm:mb-16 max-w-3xl mx-auto">
                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed px-4">
                        {t.hero.subtitle1}
                        <span className="text-accent font-semibold">{t.hero.subtitle2}</span>
                        {t.hero.subtitle3}
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 sm:mb-20">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollToSection('#contact')}
                        className="px-6 sm:px-8 py-3 sm:py-4 bg-accent text-dark-900 font-semibold rounded-lg glow-accent hover:bg-accent/90 transition-all duration-300 w-full sm:w-auto sm:min-w-[180px] text-sm sm:text-base"
                    >
                        {t.hero.ctaContact}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollToSection('#experience')}
                        className="px-6 sm:px-8 py-3 sm:py-4 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-all duration-300 w-full sm:w-auto sm:min-w-[180px] text-sm sm:text-base"
                    >
                        {t.hero.ctaProjects}
                    </motion.button>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 sm:gap-6 lg:gap-8 justify-center mb-16 sm:mb-20">
                    {[
                        { icon: Github, href: 'https://github.com/cedricdsst', label: t.hero.socials.github },
                        { icon: Linkedin, href: 'https://www.linkedin.com/in/c%C3%A9dric-dousset-951110210/', label: t.hero.socials.linkedin },
                        { icon: Twitter, href: 'https://x.com/cedric_dsst', label: t.hero.socials.twitter }
                    ].map(({ icon: Icon, href, label }) => (
                        <motion.a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-gray-400 hover:text-accent transition-colors duration-300 p-3 rounded-full border border-gray-600 hover:border-accent glass"
                        >
                            <Icon size={24} />
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </>
    )
}

export default HeroSection 