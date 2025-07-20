'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import { Send, Mail, Phone, MapPin, CheckCircle, AlertCircle, Clock } from 'lucide-react'

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
            label: "Email",
            value: "contact@votre-email.com",
            href: "mailto:contact@votre-email.com"
        },
        {
            icon: Phone,
            label: "Téléphone",
            value: "+33 1 23 45 67 89",
            href: "tel:+33123456789"
        },
        {
            icon: MapPin,
            label: "Localisation",
            value: "Paris, France",
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
                        <span className="gradient-text">Contact</span>
                    </h2>
                    <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
                    <p className="text-gray-300 text-xl max-w-3xl mx-auto">
                        Prêt à transformer vos idées en réalité ? Discutons de votre prochain projet !
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
                                Restons en <span className="text-accent">contact</span>
                            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                Je suis toujours intéressé par de nouveaux défis et opportunités de collaboration.
                                N&apos;hésitez pas à me contacter pour discuter de vos projets ou simplement pour échanger
                                sur les dernières innovations en IA et développement web.
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
                                Disponibilité
                            </h4>
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-gray-300">
                                    Actuellement disponible pour nouveaux projets
                                </span>
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
                                        Nom *
                                    </label>
                                    <input
                                        {...register('name', {
                                            required: 'Le nom est requis',
                                            minLength: { value: 2, message: 'Le nom doit faire au moins 2 caractères' }
                                        })}
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none transition-colors duration-300"
                                        placeholder="Votre nom"
                                    />
                                    {errors.name && (
                                        <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-white font-medium mb-2">
                                        Email *
                                    </label>
                                    <input
                                        {...register('email', {
                                            required: 'L\'email est requis',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Email invalide'
                                            }
                                        })}
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none transition-colors duration-300"
                                        placeholder="votre@email.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-white font-medium mb-2">
                                    Sujet *
                                </label>
                                <input
                                    {...register('subject', {
                                        required: 'Le sujet est requis',
                                        minLength: { value: 5, message: 'Le sujet doit faire au moins 5 caractères' }
                                    })}
                                    type="text"
                                    id="subject"
                                    className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none transition-colors duration-300"
                                    placeholder="Sujet de votre message"
                                />
                                {errors.subject && (
                                    <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-white font-medium mb-2">
                                    Message *
                                </label>
                                <textarea
                                    {...register('message', {
                                        required: 'Le message est requis',
                                        minLength: { value: 20, message: 'Le message doit faire au moins 20 caractères' }
                                    })}
                                    id="message"
                                    rows={6}
                                    className="w-full px-4 py-3 bg-dark-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none transition-colors duration-300 resize-none"
                                    placeholder="Décrivez votre projet ou votre demande..."
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
                                        <p>Limite d'envoi atteinte pour cet email.</p>
                                        <p className="text-sm text-orange-300 mt-1">
                                            Réessayez après {new Date(rateLimitInfo.resetTime).toLocaleString('fr-FR')}.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Submit Status */}
                            {submitStatus === 'success' && (
                                <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-3 rounded-lg">
                                    <CheckCircle size={20} />
                                    <p>Message envoyé avec succès ! Je vous répondrai rapidement.</p>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
                                    <AlertCircle size={20} />
                                    <div>
                                        <p>Erreur lors de l&apos;envoi. Veuillez réessayer.</p>
                                        {rateLimitInfo && rateLimitInfo.remaining === 0 && (
                                            <p className="text-sm text-red-300 mt-1">
                                                Limite atteinte. Réessayez après {new Date(rateLimitInfo.resetTime).toLocaleString('fr-FR')}.
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
                                        Envoi en cours...
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        Envoyer le message
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