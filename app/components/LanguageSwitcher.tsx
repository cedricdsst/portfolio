'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage()
    const toggle = () => setLanguage(language === 'fr' ? 'en' : 'fr')

    return (
        <motion.button
            type="button"
            aria-label="Toggle language"
            title={language === 'fr' ? 'Switch to English' : 'Basculer en Français'}
            whileTap={{ scale: 0.95 }}
            onClick={toggle}
            className="ml-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-600 text-sm bg-dark-700 hover:border-accent/50 transition-colors duration-300"
        >
            <span className="text-accent font-semibold">{language === 'fr' ? 'FR' : 'EN'}</span>
            <span className="h-4 w-px bg-gray-600" />
            <span className="text-gray-300">{language === 'fr' ? 'EN' : 'FR'}</span>
        </motion.button>
    )
}


