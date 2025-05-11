import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './modules/core/css/index.css'
import App from './modules/core/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
