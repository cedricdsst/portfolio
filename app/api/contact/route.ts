import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Stockage en mémoire pour le rate limiting (en production, utilisez Redis ou une DB)
const emailAttempts = new Map<string, { count: number; lastReset: number }>()

// Configuration du rate limiting
const RATE_LIMIT = {
  MAX_ATTEMPTS: 2, // 2 emails par heure
  WINDOW_MS: 60 * 60 * 1000, // 1 heure en millisecondes
}

function checkRateLimit(email: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const userAttempts = emailAttempts.get(email)

  if (!userAttempts) {
    emailAttempts.set(email, { count: 1, lastReset: now })
    return { allowed: true, remaining: RATE_LIMIT.MAX_ATTEMPTS - 1, resetTime: now + RATE_LIMIT.WINDOW_MS }
  }

  // Vérifier si la fenêtre de temps a expiré
  if (now - userAttempts.lastReset > RATE_LIMIT.WINDOW_MS) {
    emailAttempts.set(email, { count: 1, lastReset: now })
    return { allowed: true, remaining: RATE_LIMIT.MAX_ATTEMPTS - 1, resetTime: now + RATE_LIMIT.WINDOW_MS }
  }

  // Vérifier si l'utilisateur a dépassé la limite
  if (userAttempts.count >= RATE_LIMIT.MAX_ATTEMPTS) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: userAttempts.lastReset + RATE_LIMIT.WINDOW_MS
    }
  }

  // Incrémenter le compteur
  userAttempts.count++
  emailAttempts.set(email, userAttempts)

  return {
    allowed: true,
    remaining: RATE_LIMIT.MAX_ATTEMPTS - userAttempts.count,
    resetTime: userAttempts.lastReset + RATE_LIMIT.WINDOW_MS
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validation des données
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      )
    }

    // Vérification du rate limiting
    const rateLimit = checkRateLimit(email)
    if (!rateLimit.allowed) {
      const resetTime = new Date(rateLimit.resetTime).toLocaleString('fr-FR')
      return NextResponse.json(
        {
          error: `Limite d'envoi atteinte. Vous pouvez envoyer ${RATE_LIMIT.MAX_ATTEMPTS} emails par heure. Réessayez après ${resetTime}`,
          rateLimit: {
            remaining: rateLimit.remaining,
            resetTime: rateLimit.resetTime
          }
        },
        { status: 429 }
      )
    }

    // Template HTML pour l'email
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Nouveau message de contact</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
              border: 1px solid #e0e0e0;
            }
            .accent {
              color: #00d9ff;
              font-weight: bold;
            }
            .info-row {
              margin: 15px 0;
              padding: 10px;
              background: white;
              border-radius: 5px;
              border-left: 4px solid #00d9ff;
            }
            .message-box {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin-top: 20px;
              border: 1px solid #e0e0e0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📧 Nouveau message de contact</h1>
            <p>Votre portfolio a reçu un nouveau message</p>
          </div>
          
          <div class="content">
            <div class="info-row">
              <strong>Nom :</strong> ${name}
            </div>
            
            <div class="info-row">
              <strong>Email :</strong> <span class="accent">${email}</span>
            </div>
            
            <div class="info-row">
              <strong>Sujet :</strong> ${subject}
            </div>
            
            <div class="message-box">
              <strong>Message :</strong>
              <p style="margin-top: 10px; white-space: pre-wrap;">${message}</p>
            </div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;">
            
            <p style="text-align: center; color: #666; font-size: 14px;">
              Ce message a été envoyé via votre portfolio<br>
              <span class="accent">DevIA Portfolio</span>
            </p>
          </div>
        </body>
      </html>
    `

    // Vérification des variables d'environnement
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY manquante')
      return NextResponse.json(
        { error: 'Configuration serveur manquante' },
        { status: 500 }
      )
    }

    if (!process.env.CONTACT_EMAIL) {
      console.error('CONTACT_EMAIL manquante')
      return NextResponse.json(
        { error: 'Email de contact non configuré' },
        { status: 500 }
      )
    }

    // Envoi de l'email principal
    const data = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>', // Utilisez l'email par défaut de Resend pour les tests
      to: [process.env.CONTACT_EMAIL],
      subject: `[Portfolio] ${subject}`,
      html: htmlTemplate,
      reply_to: email,
    })

    console.log('Email principal envoyé:', data)

    // Email de confirmation à l'expéditeur
    const confirmationTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Message bien reçu !</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
              border: 1px solid #e0e0e0;
            }
            .accent { color: #00d9ff; font-weight: bold; }
            .success-icon {
              font-size: 48px;
              text-align: center;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="success-icon">✅</div>
            <h1>Message bien reçu !</h1>
          </div>
          
          <div class="content">
            <p>Bonjour <strong>${name}</strong>,</p>
            
            <p>Merci de m'avoir contacté ! J'ai bien reçu votre message concernant : "<em>${subject}</em>"</p>
            
            <p>Je vous répondrai dans les plus brefs délais, généralement sous 24-48 heures.</p>
            
            <p>En attendant, n'hésitez pas à découvrir mes projets sur mon <span class="accent">portfolio</span>.</p>
            
            <p>Bonne journée !<br>
            <strong>DevIA</strong></p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;">
            
            <p style="text-align: center; color: #666; font-size: 12px;">
              Ceci est un message automatique, merci de ne pas y répondre.
            </p>
          </div>
        </body>
      </html>
    `

    // Envoi de l'email de confirmation
    const confirmationData = await resend.emails.send({
      from: 'DevIA <onboarding@resend.dev>', // Utilisez l'email par défaut de Resend pour les tests
      to: [email],
      subject: 'Message bien reçu - DevIA Portfolio',
      html: confirmationTemplate,
    })

    console.log('Email de confirmation envoyé:', confirmationData)

    return NextResponse.json(
      {
        message: 'Email envoyé avec succès',
        rateLimit: {
          remaining: rateLimit.remaining,
          resetTime: rateLimit.resetTime
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    )
  }
} 