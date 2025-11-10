import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Github, MessageCircle, Mail, Send } from 'lucide-react'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log('Form submitted:', formData)
    alert('Thank you for your message! (This is a demo - no message was sent)')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactLinks = [
    {
      icon: Github,
      href: 'https://github.com/TNTaddicted',
      label: 'GitHub',
      text: 'TNTaddicted',
    },
    {
      icon: MessageCircle,
      href: 'https://discord.com/users/tntaddicts',
      label: 'Discord',
      text: 'Bonked_TNT',
    },
    {
      icon: Mail,
      href: 'mailto:contact@tntaddict.net',
      label: 'Email',
      text: 'contact@tntaddict.net',
    },
  ]

  return (
    <section id="contact" className="py-20 md:py-32 bg-white dark:bg-dark-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Let's <span className="text-neon-green dark:text-neon-green">Connect</span>
            </h2>
            <div className="w-24 h-1 bg-neon-green mx-auto rounded mb-4"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Have a project in mind or want to collaborate? Get in touch!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Links */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Find me on
              </h3>
              {contactLinks.map((contact, index) => {
                const Icon = contact.icon
                return (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 10, scale: 1.05 }}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border hover:border-neon-green dark:hover:border-neon-green transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-full bg-neon-green/10 dark:bg-neon-green/20 group-hover:bg-neon-green/20 dark:group-hover:bg-neon-green/30 transition-colors">
                      <Icon className="w-6 h-6 text-neon-green dark:text-neon-green" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{contact.label}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{contact.text}</p>
                    </div>
                  </motion.a>
                )
              })}
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border focus:border-neon-green dark:focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/20 text-gray-900 dark:text-white transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border focus:border-neon-green dark:focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/20 text-gray-900 dark:text-white transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border focus:border-neon-green dark:focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/20 text-gray-900 dark:text-white transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 px-6 bg-neon-green hover:bg-neon-green-dark text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-neon-green/50 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact

