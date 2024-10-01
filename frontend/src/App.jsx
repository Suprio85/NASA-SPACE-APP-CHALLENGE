import './App.css'
import HomePage from './pages/HomePage'
import LogInPage from './pages/LogInPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './pages/Navbar'
import Registration from './pages/Registration'
import JourneyWithorbit from './pages/journeyWithorbit'
import ExoplanetPage from './pages/ShowAllPlanet'
import StarPlanetPage from './pages/ShowAllStars'
import SolarSystem from './component/animatedSolarSystem'
import Planets from "./component/Planets"
import Chatbot from './component/Chatbot'
import TeacherBlog from './pages/TeacherBlog'
import RadialVelocity from './pages/RadialVelocity'
import TransitSimulator from './pages/TransitSimulation'
import HowWeFindExoplanets from './pages/differentMethods/howWeFindExoplanets'
import TransitMethod from './pages/differentMethods/TransitMethod'
function App() {
  return (
    <Router>
      <Chatbot />
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LogInPage />} />
        <Route path='/signup' element={<Registration />} />
        <Route path='/journeywithOrbit' element={<JourneyWithorbit />} />
            <Route path='/howwefindexoplanets/' element={<HowWeFindExoplanets/>} />
                <Route path='/transitmethod' element={<TransitMethod />} /> 
        <Route path='/planet' element={<ExoplanetPage />} />
        <Route path='/stars' element={<StarPlanetPage />} />
        <Route path='/video' element={<SolarSystem />} />
        <Route path='/test' element={<Planets />} />
        <Route path='/teacherblog' element={<TeacherBlog />} />
        <Route path='/radialvelocity' element={<RadialVelocity />} />
        <Route path='/transitsimulator' element={<TransitSimulator />} />
      </Routes>
    </Router>
  );
}

export default App;
