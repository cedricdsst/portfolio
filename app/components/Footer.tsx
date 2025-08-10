'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Heart } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const { t } = useLanguage()
    const socialLinks = [
        { icon: Github, href: 'https://github.com/cedricdsst', label: 'GitHub' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/c%C3%A9dric-dousset-951110210/', label: 'LinkedIn' },
        { icon: Twitter, href: 'https://x.com/cedric_dsst', label: 'Twitter' }
    ]

    const quickLinks = [
        { name: t.nav.about, href: '#about' },
        { name: t.nav.skills, href: '#skills' },
        { name: t.nav.projects, href: '#projects' },
        { name: t.nav.experience, href: '#experience' },
        { name: t.nav.contact, href: '#contact' }
    ]

    const scrollToSection = (href: string) => {
        if (href.startsWith('#')) {
            const element = document.querySelector(href)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    return (
        <footer className="bg-dark-800 border-t border-white/10 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0">
                <div className="absolute top-10 right-20 w-32 h-32 bg-accent/5 rounded-full blur-2xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="mb-4">
                            <span className="text-1xl font-bold gradient-text">&lt;CedricDSST/&gt;</span>
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            {t.footer.tagline}
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target={href.startsWith('http') ? "_blank" : undefined}
                                    rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                                    onClick={href.startsWith('#') ? (e) => { e.preventDefault(); scrollToSection(href); } : undefined}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-3 bg-dark-700 border border-gray-600 rounded-lg text-gray-400 hover:text-accent hover:border-accent/50 transition-all duration-300"
                                    aria-label={label}
                                >
                                    <Icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-white font-semibold text-lg mb-4" suppressHydrationWarning>{t.footer.nav}</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <motion.a
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            scrollToSection(link.href)
                                        }}
                                        whileHover={{ x: 5 }}
                                        className="text-gray-300 hover:text-accent transition-colors duration-300 cursor-pointer"
                                    >
                                        {link.name}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Technologies */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-white font-semibold text-lg mb-4" suppressHydrationWarning>{t.footer.technologies}</h3>
                        <div className="flex flex-wrap gap-2">
                            {['React', 'Next.js', 'TypeScript', 'Python', 'IA', 'Node.js'].map((tech) => (
                                <motion.span
                                    key={tech}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-3 py-1 bg-dark-700 border border-gray-600 rounded-full text-accent text-sm"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p className="text-gray-400 text-sm">© {currentYear} CedricDSST Portfolio. {t.footer.rights}</p>

                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <span>{t.footer.madeWith}</span>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <Heart className="w-4 h-4 text-red-500 fill-current" />
                        </motion.div>
                        <span>{t.footer.andNext}</span>
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}

export default Footer 