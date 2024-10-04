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
import Planets from "./component/Planets"
import TeacherBlog from './pages/TeacherBlog'
import RadialVelocity from './pages/RadialVelocity'
import TransitSimulator from './pages/TransitSimulation'
import Chatbot from './component/Chatbot'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { UserProvider } from './contexts/userContext.jsx'


function App() {
     console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID)
 
  return (
    <GoogleOAuthProvider clientId ={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UserProvider>
    <Router>
      <Chatbot />
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LogInPage />} />
        <Route path='/signup' element={<Registration />} />
        <Route path='/journeywithOrbit' element={<JourneyWithorbit />} />
        <Route path='/planet' element={<ExoplanetPage/>} />
        <Route path='/stars' element={<StarPlanetPage/>} />
        <Route path='/video' element={<SolarSystem/>} />
        <Route path='/test' element={<Planets />} />
        <Route path='/teacherblog' element={<TeacherBlog />} />
        <Route path='/radialvelocity' element={<RadialVelocity />} />
        <Route path='/transitsimulator' element={<TransitSimulator />} />
      </Routes>
      </Router>
      </UserProvider>
    </GoogleOAuthProvider>
  )
}

export default App;
