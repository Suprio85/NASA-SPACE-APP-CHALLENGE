import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ExoplanetGame3D from './component/PlanetDetails.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ExoplanetGame3D/>
  </StrictMode>,
)
