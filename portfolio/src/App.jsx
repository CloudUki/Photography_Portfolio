import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GalleryList from './pages/GalleryPage'
import GalleryPage from './components/PhotoList'
import HomePage from './pages/HomePage'
import { Analytics } from "@vercel/analytics/react"
import Footer from '@/components/Footer'
import Contact from './pages/Contact'
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default App;