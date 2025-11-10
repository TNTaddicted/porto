import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [imageError, setImageError] = useState(false)

  return (
    <section id="about" className="py-20 md:py-32 bg-light-surface dark:bg-dark-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              About <span className="text-neon-green dark:text-neon-green">Me</span>
            </h2>
            <div className="w-24 h-1 bg-neon-green mx-auto rounded"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Avatar Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center md:justify-end"
            >
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-neon-green/50 dark:border-neon-green overflow-hidden bg-gray-200 dark:bg-dark-border shadow-2xl flex items-center justify-center"
                >
                  {imageError ? (
                    <div className="w-full h-full flex items-center justify-center text-6xl md:text-8xl">
                      👤
                    </div>
                  ) : (
                    <img
                      src="/pfp.png"
                      alt="TNT_addict"
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  )}
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -right-4 w-24 h-24 bg-neon-green/20 dark:bg-neon-green/30 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Nothing here yet.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Nothing here yet.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Nothing here yet.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

