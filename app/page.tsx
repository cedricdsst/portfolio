'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ExperienceSection from './components/ExperienceSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <Navigation />

            {/* Hero Section */}
            <HeroSection />

            {/* About Section */}
            <AboutSection />

            {/* Skills Section */}
            <SkillsSection />

            {/* Experience Section */}
            <ExperienceSection />

            {/* Contact Section */}
            <ContactSection />

            {/* Footer */}
            <Footer />
        </div>
    )
} 