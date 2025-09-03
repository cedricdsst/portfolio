export type SupportedLanguage = 'fr' | 'en'

export const LOCAL_STORAGE_LANG_KEY = 'preferredLanguage'

export const dictionaries = {
    fr: {
        nav: {
            about: 'À propos',
            skills: 'Compétences',
            experience: 'Expérience',
            projects: 'Projets',
            contact: 'Contact',
        },
        switcher: {
            fr: 'Français',
            en: 'Anglais',
            aria: 'Changer la langue',
        },
        hero: {
            name: 'Cédric DOUSSET',
            titleMain: 'Développeur Web',
            titleAnd: '& IA',
            subtitle1: "Spécialisé dans l'",
            subtitle2: "intégration d'intelligence artificielle",
            subtitle3: ' au sein d\'applications web modernes',
            ctaContact: 'Me contacter',
            ctaProjects: 'Voir mes projets',
            socials: {
                github: 'GitHub',
                linkedin: 'LinkedIn',
                twitter: 'Twitter',
            },
        },
        about: {
            title: 'À propos',
            passionTitle: "Passionné par l'innovation",
            paragraph1:
                "Développeur web avec une expertise approfondie en intégration d'intelligence artificielle, je transforme des idées complexes en solutions numériques élégantes et performantes.",
            paragraph2:
                'Mon approche combine créativité technique et vision stratégique pour créer des applications web qui non seulement répondent aux besoins actuels, mais anticipent les défis de demain.',
            cards: [
                {
                    title: 'Développement Web',
                    description:
                        "Création d'applications web modernes, performantes et scalables",
                },
                {
                    title: 'Intelligence Artificielle',
                    description:
                        "Intégration d'IA dans les applications web pour des expériences utilisateur révolutionnaires",
                },
                {
                    title: 'Innovation',
                    description:
                        'Toujours à la pointe des dernières technologies et tendances du développement',
                },
            ],
        },
        skills: {
            title: 'Compétences',
            blurb:
                'Une expertise technique visualisée à travers des graphiques radar interactifs',
            degreesTitle: 'Diplômes & Formation',
            degrees: [
                {
                    title: 'Master Expert en Ingénierie Informatique',
                    school: 'ESGI Lyon',
                    year: '2023 - 2025',
                    specialty: 'Spécialisation en développement cloud et architectures distribuées',
                },
                {
                    title: 'Bachelor Expert en Ingénierie Informatique',
                    school: 'ESGI Lyon',
                    year: '2022 - 2023',
                    specialty: 'Formation en développement web full-stack et technologies modernes',
                },
                {
                    title: 'BTS SIO - Services Informatiques aux Organisations',
                    school: 'SCIENCES-U Lyon',
                    year: '2020 - 2022',
                    specialty: 'Formation en services informatiques et gestion des systèmes d\'information',
                },
            ],
            techTitle: 'Compétences Techniques',
            categories: {
                frontend: 'Frontend',
                backend: 'Backend',
                ai: 'Intelligence Artificielle',
                devops: 'DevOps & Outils',
            },
        },
        experience: {
            title: 'Expérience',
            blurb: 'Parcours professionnel',
            jobsTitle: '',
            achievementsTitle: 'Réalisations clés :',
            projectsTitle: 'Projets Personnels',
            featuresTitle: 'Fonctionnalités :',
            demo: 'Demo',
            code: 'Code',
            jobs: [
                {
                    company: 'General Electric Healthcare',
                    position: 'Développeur Web & Gestionnaire de Données',
                    location: 'Limonest, France',
                    period: '2023 - 2025',
                    description:
                        "Développement d'applications web outils internes et gestion de données pour GE Healthcare. Travail sur des solutions innovantes pour le secteur médical avec une forte composante technique.",
                    achievements: [
                        "Développement d'applications web outils internes pour optimiser les processus métier",
                        'Gestion et maintenance de bases de données complexes (Oracle, Amazon Redshift)',
                        'Intégration et développement avec Salesforce pour la gestion client',
                        "Utilisation de Talend pour l'ETL et la transformation de données",
                    ],
                    technologies: [
                        'JavaScript',
                        'PHP',
                        'Java',
                        'Talend',
                        'Oracle',
                        'Amazon Redshift',
                        'Salesforce',
                    ],
                },
                {
                    company: 'Freelance',
                    position: 'Développeur Web Full-Stack',
                    location: 'France',
                    period: '2021 - Présent',
                    description:
                        "Développement de sites web et d'applications web pour divers clients en tant que freelance. Conception de solutions sur mesure adaptées aux besoins spécifiques de chaque projet.",
                    achievements: [
                        'Développement de sites web et applications web pour clients variés',
                        'Conception de solutions sur mesure adaptées aux besoins métier',
                        'Gestion complète de projets de la conception à la livraison',
                        'Maintenance et évolution continue des applications déployées',
                    ],
                    technologies: [
                        'React',
                        'Next.js',
                        'JavaScript',
                        'PHP',
                        'Node.js',
                        'MySQL',
                        'PostgreSQL',
                        'MongoDB',
                    ],
                },
            ],
            projects: [
                {
                    title: 'CamVisualizer',
                    description:
                        'Application de visualisation 3D permettant de retranscrire les positions de personnes depuis différents flux vidéo dans une scène 3D en temps réel grâce à l\'IA.',
                    technologies: ['Three.js', 'YOLO', 'AI Depth Mapping', 'JavaScript', 'WebGL'],
                    features: [
                        'Reconnaissance humaine avec YOLO',
                        'Calcul de profondeur par IA',
                        'Visualisation 3D en temps réel',
                        'Gestion de salles et caméras',
                        'Configuration spatiale réaliste',
                    ],
                },
                {
                    title: 'Orassio',
                    description:
                        'SaaS permettant d\'intégrer facilement un agent IA sur votre site web d\'entreprise via une simple balise script. L\'agent connaît toutes les informations de votre entreprise et peut collecter les contacts des utilisateurs.',
                    technologies: ['Next.js', 'PydanticAI', 'OpenAI API', 'Python', 'TypeScript'],
                    features: [
                        'Intégration simple via balise script',
                        'Agent IA personnalisé par entreprise',
                        'Collecte automatique de contacts',
                        'Interface d\'administration complète',
                        'Réponses contextuelles intelligentes',
                    ],
                },

            ],
        },
        contact: {
            title: 'Contact',
            blurb:
                'Prêt à transformer vos idées en réalité ? Discutons de votre prochain projet !',
            stayInTouchTitle: 'Restons en contact',
            stayInTouchText:
                "Je suis toujours intéressé par de nouveaux défis et opportunités de collaboration. N'hésitez pas à me contacter pour discuter de vos projets ou simplement pour échanger sur les dernières innovations en IA et développement web.",
            availabilityTitle: 'Disponibilité',
            availabilityText: 'Actuellement disponible pour nouveaux projets',
            form: {
                name: 'Nom *',
                email: 'Email *',
                subject: 'Sujet *',
                message: 'Message *',
                placeholders: {
                    name: 'Votre nom',
                    email: 'votre@email.com',
                    subject: 'Sujet de votre message',
                    message: 'Décrivez votre projet ou votre demande...',
                },
                submit: 'Envoyer le message',
                sending: 'Envoi en cours...',
                success: 'Message envoyé avec succès ! Je vous répondrai rapidement.',
                error: "Erreur lors de l'envoi. Veuillez réessayer.",
                validations: {
                    nameRequired: 'Le nom est requis',
                    nameMin: 'Le nom doit faire au moins 2 caractères',
                    emailRequired: "L'email est requis",
                    emailInvalid: 'Email invalide',
                    subjectRequired: 'Le sujet est requis',
                    subjectMin: 'Le sujet doit faire au moins 5 caractères',
                    messageRequired: 'Le message est requis',
                    messageMin: 'Le message doit faire au moins 20 caractères',
                },
                rateLimit: {
                    reached: "Limite d'envoi atteinte pour cet email.",
                    tryAfter: 'Réessayez après',
                    reachedShort: 'Limite atteinte. Réessayez après',
                },
            },
            info: {
                email: 'Email',
                phone: 'Téléphone',
                location: 'Localisation',
            },
        },
        footer: {
            nav: 'Navigation',
            technologies: 'Technologies',
            rights: 'Tous droits réservés.',
            madeWith: 'Made with',
            andNext: 'and NextJS',
            tagline:
                "Développeur web passionné par l'intégration d'intelligence artificielle dans les applications modernes.",
        },
    },
    en: {
        nav: {
            about: 'About',
            skills: 'Skills',
            experience: 'Experience',
            projects: 'Projects',
            contact: 'Contact',
        },
        switcher: {
            fr: 'French',
            en: 'English',
            aria: 'Change language',
        },
        hero: {
            name: 'Cédric DOUSSET',
            titleMain: 'Web Developer',
            titleAnd: '& AI',
            subtitle1: 'Specialized in ',
            subtitle2: 'AI integration',
            subtitle3: ' within modern web applications',
            ctaContact: 'Contact me',
            ctaProjects: 'View my projects',
            socials: {
                github: 'GitHub',
                linkedin: 'LinkedIn',
                twitter: 'Twitter',
            },
        },
        about: {
            title: 'About',
            passionTitle: 'Passionate about innovation',
            paragraph1:
                'Web developer with deep expertise in AI integration, turning complex ideas into elegant and high-performance digital solutions.',
            paragraph2:
                'My approach blends technical creativity and strategic vision to build web applications that not only meet today\'s needs but anticipate tomorrow\'s challenges.',
            cards: [
                {
                    title: 'Web Development',
                    description:
                        'Building modern, high-performance, and scalable web applications',
                },
                {
                    title: 'Artificial Intelligence',
                    description:
                        'Integrating AI into web apps for groundbreaking user experiences',
                },
                { title: 'Innovation', description: 'Always at the cutting edge of tech and dev trends' },
            ],
        },
        skills: {
            title: 'Skills',
            blurb: 'Technical expertise visualized with interactive radar charts',
            degreesTitle: 'Degrees & Education',
            degrees: [
                {
                    title: 'Master Expert in Computer Engineering',
                    school: 'ESGI Lyon',
                    year: '2023 - 2025',
                    specialty: 'Specialization in cloud development and distributed architectures',
                },
                {
                    title: 'Bachelor Expert in Computer Engineering',
                    school: 'ESGI Lyon',
                    year: '2022 - 2023',
                    specialty: 'Training in full-stack web development and modern technologies',
                },
                {
                    title: 'BTS SIO - IT Services for Organizations',
                    school: 'SCIENCES-U Lyon',
                    year: '2020 - 2022',
                    specialty: 'Training in IT services and information systems management',
                },
            ],
            techTitle: 'Technical Skills',
            categories: {
                frontend: 'Frontend',
                backend: 'Backend',
                ai: 'Artificial Intelligence',
                devops: 'DevOps & Tools',
            },
        },
        experience: {
            title: 'Experience',
            blurb: 'Professional background',
            jobsTitle: '',
            achievementsTitle: 'Key achievements:',
            projectsTitle: 'Personal Projects',
            featuresTitle: 'Features:',
            demo: 'Demo',
            code: 'Code',
            jobs: [
                {
                    company: 'General Electric Healthcare',
                    position: 'Web Developer & Data Manager',
                    location: 'Limonest, France',
                    period: '2023 - 2025',
                    description:
                        'Development of internal web tools and data management for GE Healthcare. Working on innovative solutions for the medical sector with a strong technical component.',
                    achievements: [
                        'Developed internal web tools to optimize business processes',
                        'Managed and maintained complex databases (Oracle, Amazon Redshift)',
                        'Integrated and developed with Salesforce for customer management',
                        'Used Talend for ETL and data transformation',
                    ],
                    technologies: [
                        'JavaScript',
                        'PHP',
                        'Java',
                        'Talend',
                        'Oracle',
                        'Amazon Redshift',
                        'Salesforce',
                    ],
                },
                {
                    company: 'Freelance',
                    position: 'Full-Stack Web Developer',
                    location: 'France',
                    period: '2021 - Present',
                    description:
                        'Building websites and web applications for various clients as a freelancer. Designing custom solutions tailored to each project\'s needs.',
                    achievements: [
                        'Developed websites and web apps for diverse clients',
                        'Designed custom solutions tailored to business needs',
                        'Managed projects end-to-end from design to delivery',
                        'Provided continuous maintenance and evolution of deployed apps',
                    ],
                    technologies: [
                        'React',
                        'Next.js',
                        'JavaScript',
                        'PHP',
                        'Node.js',
                        'MySQL',
                        'PostgreSQL',
                        'MongoDB',
                    ],
                },
            ],
            projects: [
                {
                    title: 'CamVisualizer',
                    description:
                        '3D visualization application that transcribes person positions from multiple video feeds into a real-time 3D scene using AI.',
                    technologies: ['Three.js', 'YOLO', 'AI Depth Mapping', 'JavaScript', 'WebGL'],
                    features: [
                        'Human recognition with YOLO',
                        'AI depth map calculation',
                        'Real-time 3D visualization',
                        'Room and camera management',
                        'Realistic spatial configuration',
                    ],
                },
                {
                    title: 'Orassio',
                    description:
                        'SaaS that allows easy integration of an AI agent on your company website using a simple script tag. The agent knows all your company information and can collect user contact details.',
                    technologies: ['Next.js', 'PydanticAI', 'OpenAI API', 'Python', 'TypeScript'],
                    features: [
                        'Simple integration via script tag',
                        'AI agent customized per company',
                        'Automatic contact collection',
                        'Complete admin interface',
                        'Smart contextual responses',
                    ],
                },

            ],
        },
        contact: {
            title: 'Contact',
            blurb: 'Ready to turn your ideas into reality? Let\'s discuss your next project!',
            stayInTouchTitle: 'Let\'s keep in touch',
            stayInTouchText:
                "I'm always interested in new challenges and collaboration opportunities. Feel free to contact me to discuss your projects or simply to chat about the latest innovations in AI and web development.",
            availabilityTitle: 'Availability',
            availabilityText: 'Currently available for new projects',
            form: {
                name: 'Name *',
                email: 'Email *',
                subject: 'Subject *',
                message: 'Message *',
                placeholders: {
                    name: 'Your name',
                    email: 'your@email.com',
                    subject: 'Subject of your message',
                    message: 'Describe your project or request...',
                },
                submit: 'Send message',
                sending: 'Sending...',
                success: 'Message sent successfully! I will reply shortly.',
                error: 'Error while sending. Please try again.',
                validations: {
                    nameRequired: 'Name is required',
                    nameMin: 'Name must be at least 2 characters',
                    emailRequired: 'Email is required',
                    emailInvalid: 'Invalid email',
                    subjectRequired: 'Subject is required',
                    subjectMin: 'Subject must be at least 5 characters',
                    messageRequired: 'Message is required',
                    messageMin: 'Message must be at least 20 characters',
                },
                rateLimit: {
                    reached: 'Send limit reached for this email.',
                    tryAfter: 'Try again after',
                    reachedShort: 'Limit reached. Try again after',
                },
            },
            info: {
                email: 'Email',
                phone: 'Phone',
                location: 'Location',
            },
        },
        footer: {
            nav: 'Navigation',
            technologies: 'Technologies',
            rights: 'All rights reserved.',
            madeWith: 'Made with',
            andNext: 'and NextJS',
            tagline:
                'Web developer passionate about integrating artificial intelligence into modern applications.',
        },
    },
} as const

export type Dictionary = (typeof dictionaries)[SupportedLanguage]


