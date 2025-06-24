import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GalleryList from './pages/GalleryPage'
import GalleryPage from './components/PhotoList'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/galleries" element={<GalleryList />} />
        <Route path="/gallery/:id" element={<GalleryPage />} />
      </Routes>
    </Router>
  )
}

export default App