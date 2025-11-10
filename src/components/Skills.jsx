import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const skills = [
    { name: 'Laziness', level: 100 },
    { name: 'Python', level: 80 },
    { name: 'React', level: 75 },
    { name: 'Gaming', level: 100 },
    { name: 'Networking', level: 65 },
    { name: 'HTML/CSS', level: 90 },
    { name: 'Node.js', level: 70 },
    { name: 'Git', level: 0 },
    { name: 'TailwindCSS', level: 80 },
    { name: 'Cybersecurity', level: 25 },
    { name: 'Docker', level: 0 },
    { name: 'SQL', level: 70 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="skills" className="py-20 md:py-32 bg-white dark:bg-dark-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              My <span className="text-neon-green dark:text-neon-green">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-neon-green mx-auto rounded"></div>
          </div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border hover:border-neon-green dark:hover:border-neon-green transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-neon-green/20"
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    {skill.name}
                  </h3>
                  <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-2 mb-2">
                    <motion.div
                      className="h-2 rounded-full bg-gradient-to-r from-neon-green to-neon-green-light"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills

