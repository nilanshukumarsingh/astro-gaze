import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import FlexFiller from './components/FlexFiller'
import IndexView from './views/IndexView'
import NotFoundView from './views/NotFoundView'
import StarBackground from './components/StarBackground'

const RandomRedirect = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const start = new Date(1995, 5, 16)
    const end = new Date()
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    navigate(`/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`, { replace: true })
  }, [navigate])

  return null
}

function App() {
  const todayUrl = () => {
    const date = new Date()
    return `/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  }

  return (
    <Router>
      <StarBackground />
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to={todayUrl()} replace />} />
            <Route path="/:year/:month/:day" element={<IndexView />} />
            <Route path="/random" element={<RandomRedirect />} />
            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </main>
        <FlexFiller />
        <Footer />
      </div>
    </Router>
  )
}

export default App
