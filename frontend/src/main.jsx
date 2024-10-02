import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ExoplanetGame3D from './component/checkHabitable.jsx'
import Planets from './component/Planets.jsx'
import Game from './pages/PlanetTypeGame.jsx'




createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <ExoplanetGame3D />
  // </StrictMode>,
)
