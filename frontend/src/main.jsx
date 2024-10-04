import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ExoplanetGame3D from './component/checkHabitable.jsx'
import Planets from './component/Planets.jsx'
import Game from './pages/PlanetTypeGame.jsx'
import ExoplanetCreator from './pages/ExoplanetCreator.jsx'




createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
