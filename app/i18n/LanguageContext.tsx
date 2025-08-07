'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { dictionaries, LOCAL_STORAGE_LANG_KEY, type SupportedLanguage, type Dictionary } from './dictionaries'

type LanguageContextType = {
    language: SupportedLanguage
    setLanguage: (lang: SupportedLanguage) => void
    t: Dictionary
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    // Default FR for SEO on SSR; switch to stored preference after mount to avoid hydration mismatch
    const [language, setLanguage] = useState<SupportedLanguage>('fr')
    const [hasInitialized, setHasInitialized] = useState(false)

    // Hydrate preference after mount
    useEffect(() => {
        try {
            const stored = window.localStorage.getItem(LOCAL_STORAGE_LANG_KEY) as SupportedLanguage | null
            if (stored === 'en' || stored === 'fr') {
                setLanguage(stored)
            }
        } catch { }
        setHasInitialized(true)
    }, [])

    // Persist preference
    useEffect(() => {
        if (!hasInitialized) return
        try {
            window.localStorage.setItem(LOCAL_STORAGE_LANG_KEY, language)
        } catch { }
    }, [language, hasInitialized])

    // Reflect language on <html lang> for a11y (keeps SSR lang="fr" for SEO by default)
    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('lang', language)
        }
    }, [language])

    const value = useMemo<LanguageContextType>(() => ({
        language,
        setLanguage,
        t: dictionaries[language],
    }), [language])

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const ctx = useContext(LanguageContext)
    if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
    return ctx
}


