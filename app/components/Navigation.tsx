'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../i18n/LanguageContext'

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()
    const isHomePage = pathname === '/'

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const { t } = useLanguage()
    const navItems = [
        { href: '#about', label: t.nav.about },
        { href: '#skills', label: t.nav.skills },
        { href: '#projects', label: t.nav.projects },
        { href: '#experience', label: t.nav.experience },
        { href: '/blog', label: 'Blog' },
        { href: '#contact', label: t.nav.contact },
    ]

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
        setIsOpen(false)
    }

    const handleNavClick = (e: React.MouseEvent, href: string) => {
        if (href.startsWith('#')) {
            if (isHomePage) {
                e.preventDefault()
                scrollToSection(href)
            } else {
                // Sur une autre page, laisser le lien faire la navigation vers /#section
                setIsOpen(false)
            }
        }
    }

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'glass border-b border-white/10'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex-shrink-0"
                    >
                        <Link
                            href="/"
                            className="text-1xl font-bold gradient-text cursor-pointer"
                        >
                            &lt;CedricDSST/&gt;
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navItems.map((item) => (
                                <motion.div key={item.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href={item.href.startsWith('#') && !isHomePage ? `/${item.href}` : item.href}
                                        onClick={(e) => handleNavClick(e, item.href)}
                                        className="text-gray-300 hover:text-accent transition-colors duration-300 px-3 py-2 text-sm font-medium cursor-pointer block"
                                    >
                                        <span suppressHydrationWarning>{item.label}</span>
                                    </Link>
                                </motion.div>
                            ))}
                            <LanguageSwitcher />
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-accent p-2"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <motion.div
                initial={false}
                animate={isOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                className="md:hidden glass border-t border-white/10 overflow-hidden"
            >
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {navItems.map((item) => (
                        <motion.div key={item.href} whileHover={{ x: 10 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                href={item.href.startsWith('#') && !isHomePage ? `/${item.href}` : item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className="text-gray-300 hover:text-accent block px-3 py-2 text-base font-medium cursor-pointer"
                            >
                                {item.label}
                            </Link>
                        </motion.div>
                    ))}
                    <div className="px-3 py-2"><LanguageSwitcher /></div>
                </div>
            </motion.div>
        </motion.nav>
    )
}

export default Navigation 