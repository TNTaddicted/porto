import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, MessageCircle, Mail } from 'lucide-react'

const Hero = () => {
  const [displayText, setDisplayText] = useState('')
  const fullText = "Hey, I'm TNT_addict."

  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [fullText])

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/TNTaddicted',
      label: 'GitHub',
    },
    {
      icon: MessageCircle,
      href: 'https://discord.com/users/tntaddicts',
      label: 'Discord',
    },
    {
      icon: Mail,
      href: 'mailto:contact@tntaddict.net',
      label: 'Email',
    },
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Typewriter Text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            {displayText ? (
              <>
                {displayText.includes('TNT_addict') ? (
                  <>
                    {displayText.split('TNT_addict')[0]}
                    <span className="text-neon-green dark:text-neon-green">TNT_addict</span>
                    {displayText.split('TNT_addict')[1]}
                  </>
                ) : (
                  displayText
                )}
                {displayText.length < fullText.length && (
                  <span className="text-neon-green dark:text-neon-green animate-pulse ml-1">|</span>
                )}
              </>
            ) : (
              <span className="text-neon-green dark:text-neon-green animate-pulse">|</span>
            )}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Nothing here yet.
          </motion.p>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center space-x-6"
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="p-4 rounded-full bg-white/10 dark:bg-dark-surface/50 backdrop-blur-md border border-gray-300 dark:border-neon-green/30 hover:border-neon-green dark:hover:border-neon-green text-gray-700 dark:text-neon-green hover:bg-neon-green/10 transition-all duration-300"
                  aria-label={social.label}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              )
            })}
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-neon-green/70 dark:border-neon-green rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 bg-neon-green/70 dark:bg-neon-green rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero

