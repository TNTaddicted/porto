import { useState, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Loading from './components/Loading'
import CursorEffects from './components/CursorEffects'
import Home from './pages/Home'
import AUFiles from './pages/AUFiles'
import AddAUFile from './pages/AddAUFile'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 seconds loading time

    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider>
      <CursorEffects />
      <Loading isLoading={isLoading} />
      <div
        className={`min-h-screen bg-white dark:bg-dark-bg transition-opacity duration-500 ${
          isLoading ? 'opacity-0 pointer-events-none select-none' : 'opacity-100'
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aufiles" element={<AUFiles />} />
          <Route path="/aufiles/add" element={<AddAUFile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App

