import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Planets from './component/Planets.jsx'
import Chatbot from './component/Chatbot.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Chatbot/>
  </StrictMode>,
)
