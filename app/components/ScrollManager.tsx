'use client'

import { useEffect } from 'react'

export default function ScrollManager() {
    useEffect(() => {
        try {
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual'
            }
        } catch { }

        // Ensure top on initial load
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

        const handleBeforeUnload = () => {
            // Some browsers may still attempt to restore; force top before unload
            window.scrollTo(0, 0)
        }
        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
            try {
                if ('scrollRestoration' in history) {
                    history.scrollRestoration = 'auto'
                }
            } catch { }
        }
    }, [])

    return null
}


