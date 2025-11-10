import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-light-surface dark:bg-dark-bg border-t border-light-border dark:border-dark-border py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-600 dark:text-gray-400">
            © {currentYear} TNT_addict. Built with{' '}
            <Heart className="inline-block w-4 h-4 text-red-500 animate-pulse" /> using React +
            Tailwind.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            <a
              href="https://tntaddict.net"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neon-green dark:hover:text-neon-green transition-colors underline decoration-neon-green/0 hover:decoration-neon-green"
            >
              tntaddict.net
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

