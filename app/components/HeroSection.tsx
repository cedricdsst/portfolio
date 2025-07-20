'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react'

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
                staggerChildren: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    }

    const scrollToAbout = () => {
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-2xl animate-pulse-slow delay-2000"></div>
            </div>

            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="text-center z-10 px-4 sm:px-6 lg:px-8"
            >
                {/* Greeting */}
                <motion.div variants={itemVariants} className="mb-6">
                    <span className="text-accent text-lg font-mono">Salut, je suis</span>
                </motion.div>

                {/* Name */}
                <motion.h1 variants={itemVariants} className="mb-8">
                    <span className="text-4xl sm:text-6xl lg:text-8xl font-bold gradient-text block">
                        Développeur
                    </span>
                    <span className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white mt-2 block">
                        IA & Web
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.div variants={itemVariants} className="mb-12 max-w-2xl mx-auto">
                    <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
                        Spécialisé dans l&apos;
                        <span className="text-accent font-semibold">intégration d&apos;intelligence artificielle</span>
                        {' '}au sein d&apos;applications web modernes
                    </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 bg-accent text-dark-900 font-semibold rounded-lg glow-accent hover:bg-accent/90 transition-all duration-300 min-w-[200px]"
                    >
                        Me contacter
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-all duration-300 min-w-[200px]"
                    >
                        Voir mes projets
                    </motion.button>
                </motion.div>

                {/* Social Links */}
                <motion.div variants={itemVariants} className="flex gap-8 justify-center mb-16">
                    {[
                        { icon: Github, href: '#', label: 'GitHub' },
                        { icon: Linkedin, href: '#', label: 'LinkedIn' },
                        { icon: Mail, href: '#contact', label: 'Email' }
                    ].map(({ icon: Icon, href, label }) => (
                        <motion.a
                            key={label}
                            href={href}
                            whileHover={{ scale: 1.2, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-gray-400 hover:text-accent transition-colors duration-300 p-3 rounded-full border border-gray-600 hover:border-accent glass"
                            onClick={href === '#contact' ? (e) => { e.preventDefault(); scrollToAbout(); } : undefined}
                        >
                            <Icon size={24} />
                        </motion.a>
                    ))}
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    variants={itemVariants}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <motion.button
                        onClick={scrollToAbout}
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-gray-400 hover:text-accent transition-colors duration-300 p-2"
                    >
                        <ChevronDown size={32} />
                    </motion.button>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default HeroSection 