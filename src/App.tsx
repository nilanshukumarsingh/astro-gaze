import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import FlexFiller from './components/FlexFiller'
import IndexView from './views/IndexView'
import NotFoundView from './views/NotFoundView'
import StarBackground from './components/StarBackground'

function App() {
  const todayUrl = () => {
    const date = new Date()
    return `/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  }

  const randomDateUrl = () => {
    const start = new Date(1995, 5, 16)
    const end = new Date()
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
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
            <Route path="/random" element={<Navigate to={randomDateUrl()} replace />} />
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
