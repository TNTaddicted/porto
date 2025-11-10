import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Github, ExternalLink } from 'lucide-react'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const projects = [
    {
      title: 'Example 1',
      description: 'Well idk what to put here yet.',
      tech: ['React', 'Node.js', 'Crypto', 'TypeScript'],
      github: 'https://github.com/TNTaddicted',
      demo: '#',
    },
    {
      title: 'The Among Us Files',
      description: 'An archive of known Among Us dating accounts.',
      tech: ['React', 'Vite', 'Supabase'],
      github: 'https://github.com/TNTaddicted',
      demo: '/aufiles',
    },
    {
      title: 'Portfolio Website',
      description: 'This very website! Built with React, Vite, and TailwindCSS. Features dark mode, smooth animations, and responsive design.',
      tech: ['React', 'Vite', 'TailwindCSS', 'Framer Motion'],
      github: 'https://github.com/TNTaddicted',
      demo: '#',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section id="projects" className="py-20 md:py-32 bg-light-surface dark:bg-dark-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              My <span className="text-neon-green dark:text-neon-green">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-neon-green mx-auto rounded"></div>
          </div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className="project-card-glitch group relative bg-white dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-neon-green/20 transition-all duration-300 cursor-pointer"
              >
                <div className="p-6 h-full flex flex-col">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-neon-green dark:group-hover:text-neon-green transition-colors">
                    <span className="text">{project.title}</span>
                    <span className="text-decoration inline-block"> _</span>
                    <span className="decoration inline-block ml-1">⇒</span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-neon-green/10 dark:bg-neon-green/20 text-neon-green dark:text-neon-green rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-glitch-fill border-neon-green/30 dark:border-neon-green/50 text-gray-700 dark:text-gray-300 hover:text-neon-green dark:hover:text-neon-green hover:border-neon-green"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      <span className="text">Code</span>
                      <span className="text-decoration"> _</span>
                      <span className="decoration">⇒</span>
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-glitch-fill border-neon-green/30 dark:border-neon-green/50 text-gray-700 dark:text-gray-300 hover:text-neon-green dark:hover:text-neon-green hover:border-neon-green"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span className="text">Demo</span>
                      <span className="text-decoration"> _</span>
                      <span className="decoration">⇒</span>
                    </a>
                  </div>
                </div>
                <motion.div
                  className="absolute inset-0 bg-neon-green/5 dark:bg-neon-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  initial={false}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects

