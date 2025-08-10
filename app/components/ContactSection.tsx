'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import { Send, Mail, MapPin, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

interface FormData {
    name: string
    email: string
    subject: string
    message: string
}

const ContactSection = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })
    const { t } = useLanguage()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [rateLimitInfo, setRateLimitInfo] = useState<{
        remaining: number;
        resetTime: number;
    } | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm<FormData>()

    const watchedEmail = watch('email')

    // Vérifier le localStorage au chargement et quand l'email change
    useEffect(() => {
        if (watchedEmail) {
            const stored = localStorage.getItem('contactRateLimit')
            if (stored) {
                const data = JSON.parse(stored)
                if (data.email === watchedEmail && data.resetTime > Date.now()) {
                    setRateLimitInfo({
                        remaining: data.remaining,
                        resetTime: data.resetTime
                    })
                } else if (data.resetTime <= Date.now()) {
                    // Nettoyer les données expirées
                    localStorage.removeItem('contactRateLimit')
                    setRateLimitInfo(null)
                }
            }
        }
    }, [watchedEmail])

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true)
        setSubmitStatus('idle')
        setRateLimitInfo(null)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (response.ok) {
                setSubmitStatus('success')
                reset()

                // Sauvegarder les infos de rate limit dans localStorage
                if (result.rateLimit) {
                    localStorage.setItem('contactRateLimit', JSON.stringify({
                        email: data.email,
                        remaining: result.rateLimit.remaining,
                        resetTime: result.rateLimit.resetTime
                    }))
                    setRateLimitInfo(result.rateLimit)
                }

                console.log('Email envoyé avec succès:', result)
            } else {
                setSubmitStatus('error')

                // Afficher les infos de rate limit si erreur 429
                if (response.status === 429 && result.rateLimit) {
                    setRateLimitInfo(result.rateLimit)
                }

                console.error('Erreur API:', result.error)
            }
        } catch (error) {
            setSubmitStatus('error')
            console.error('Erreur réseau:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const contactInfo = [
        {
            icon: Mail,
            label: t.contact.info.email,
            value: "contact@cedricdsst.com",
            href: "mailto:contact@cedricdsst.com"
        },
        {
            icon: MapPin,
            label: t.contact.info.location,
            value: "Lyon, France",
            href: "#"
        }
    ]

    return (
        <section id="contact" className="py-20 bg-dark-900 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0">
                <div className="absolute top-10 left-20 w-48 h-48 bg-accent/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
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
                        <span className="gradient-text" suppressHydrationWarning>{t.contact.title}</span>
                    </h2>
                    <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
                    <p className="text-gray-300 text-xl max-w-3xl mx-auto" suppressHydrationWarning>
                        {t.contact.blurb}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6">
                                {t.contact.stayInTouchTitle.split(' ' + 'contact')[0]} <span className="text-accent">contact</span>
                            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                {t.contact.stayInTouchText}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={info.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                                        <info.icon className="w-6 h-6 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{info.label}</p>
                                        <a
                                            href={info.href}
                                            className="text-gray-300 hover:text-accent transition-colors duration-300"
                                        >
                                            {info.value}
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="pt-8"
                        >
                            <h4 className="text-xl font-semibold text-white mb-4">
                                {t.contact.availabilityTitle}
                            </h4>
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-gray-300">{t.contact.availabilityText}</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="glass p-8 rounded-xl border border-white/10"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-white font-medium mb-2">
                                        {t.contact.form.name}
                                    </label>
                                    <input
                                        {...register('name', {
                                            required: t.contact.form.validations.nameRequired,
                                            minLength: { value: 2, message: t.contact.form.validations.nameMin }
                                        })}
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none transition-colors duration-300"
                                        placeholder={t.contact.form.placeholders.name}
                                    />
                                    {errors.name && (
                                        <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-white font-medium mb-2">
                                        {t.contact.form.email}
                                    </label>
                                    <input
                                        {...register('email', {
                                            required: t.contact.form.validations.emailRequired,
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: t.contact.form.validations.emailInvalid
                                            }
                                        })}
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none transition-colors duration-300"
                                        placeholder={t.contact.form.placeholders.email}
                                    />
                                    {errors.email && (
                                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-white font-medium mb-2">
                                    {t.contact.form.subject}
                                </label>
                                <input
                                    {...register('subject', {
                                        required: t.contact.form.validations.subjectRequired,
                                        minLength: { value: 5, message: t.contact.form.validations.subjectMin }
                                    })}
                                    type="text"
                                    id="subject"
                                    className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none transition-colors duration-300"
                                    placeholder={t.contact.form.placeholders.subject}
                                />
                                {errors.subject && (
                                    <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-white font-medium mb-2">
                                    {t.contact.form.message}
                                </label>
                                <textarea
                                    {...register('message', {
                                        required: t.contact.form.validations.messageRequired,
                                        minLength: { value: 20, message: t.contact.form.validations.messageMin }
                                    })}
                                    id="message"
                                    rows={6}
                                    className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none transition-colors duration-300 resize-none"
                                    placeholder={t.contact.form.placeholders.message}
                                />
                                {errors.message && (
                                    <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                                )}
                            </div>

                            {/* Rate Limit Info */}
                            {rateLimitInfo && rateLimitInfo.remaining === 0 && (
                                <div className="flex items-center gap-2 text-orange-400 bg-orange-400/10 p-3 rounded-lg">
                                    <Clock size={20} />
                                    <div>
                                        <p>{t.contact.form.rateLimit.reached}</p>
                                        <p className="text-sm text-orange-300 mt-1">
                                            {t.contact.form.rateLimit.tryAfter} {new Date(rateLimitInfo.resetTime).toLocaleString('fr-FR')}.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Submit Status */}
                            {submitStatus === 'success' && (
                                <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-3 rounded-lg">
                                    <CheckCircle size={20} />
                                    <p>{t.contact.form.success}</p>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
                                    <AlertCircle size={20} />
                                    <div>
                                        <p>{t.contact.form.error}</p>
                                        {rateLimitInfo && rateLimitInfo.remaining === 0 && (
                                            <p className="text-sm text-red-300 mt-1">
                                                {t.contact.form.rateLimit.reachedShort} {new Date(rateLimitInfo.resetTime).toLocaleString('fr-FR')}.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            <motion.button
                                type="submit"
                                disabled={isSubmitting || Boolean(rateLimitInfo && rateLimitInfo.remaining === 0)}
                                whileHover={{ scale: (isSubmitting || Boolean(rateLimitInfo && rateLimitInfo.remaining === 0)) ? 1 : 1.02 }}
                                whileTap={{ scale: (isSubmitting || Boolean(rateLimitInfo && rateLimitInfo.remaining === 0)) ? 1 : 0.98 }}
                                className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${isSubmitting || Boolean(rateLimitInfo && rateLimitInfo.remaining === 0)
                                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                    : 'bg-accent text-dark-900 hover:bg-accent/90 glow-accent'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                                        {t.contact.form.sending}
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        {t.contact.form.submit}
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection 