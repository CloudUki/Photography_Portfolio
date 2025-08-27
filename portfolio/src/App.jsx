import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GalleryList from './pages/GalleryPage'
import GalleryPage from './components/PhotoList'
import HomePage from './pages/HomePage'
import { Analytics } from "@vercel/analytics/react"
import Footer from '@/components/Footer'
import Contact from './pages/Contact'

function App() {
  return (
    <Router>
      <Analytics />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/galleries" element={<GalleryList />} />
        <Route path="/gallery/:id" element={<GalleryPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;