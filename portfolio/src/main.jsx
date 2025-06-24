import React from 'react'
import ReactDOM from 'react-dom/client'
// import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from '@/components/ui/provider'
import App from './App.jsx'
// import theme from '@/components/ui/theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
)