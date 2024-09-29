import './App.css'
import HomePage from './pages/HomePage'
import LogInPage from './pages/LogInPage'
import {BrowserRouter as Router , Route, Routes } from 'react-router-dom'
import Navbar from './pages/Navbar'
import Registration from './pages/Registration'
import JourneyWithorbit from './pages/journeyWithorbit'
import ExoplanetPage from './pages/ShowAllPlanet'
import StarPlanetPage from './pages/ShowAllStars'
import SolarSystem from './component/animatedSolarSystem'
import Chatbot from './component/Chatbot'
function App() {
  return (
    <Router>
      <Navbar />
      <Chatbot/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LogInPage />} />
        <Route path='/signup' element={<Registration />} />
        <Route path='/journeywithOrbit' element={<JourneyWithorbit />} />
        <Route path='/planet' element={<ExoplanetPage/>} />
        <Route path='/stars' element={<StarPlanetPage/>} />
        <Route path='/video' element={<SolarSystem/>} />
        
      </Routes>
      
      </Router>
  )
}

export default App
