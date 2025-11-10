import { motion, AnimatePresence } from 'framer-motion'

const Loading = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-dark-bg"
        >
          <div className="particle-loader-container">
            {[...Array(13)].map((_, i) => (
              <div key={`particle-${i}`} className="particle-loader" />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loading

