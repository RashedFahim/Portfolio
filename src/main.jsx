import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Backup from './Backup.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Backup />
  </StrictMode>,
)
