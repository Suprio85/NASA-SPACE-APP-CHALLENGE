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
import TeacherBlog from './pages/TeacherBlog'
import RadialVelocity from './pages/RadialVelocity'
import TransitSimulator from './pages/TransitSimulation'
import HowWeFindExoplanets from './pages/differentMethods/howWeFindExoplanets'
import TransitMethod from './pages/differentMethods/TransitMethod'
import RadialVelocityMethod from './pages/differentMethods/RadialVelocityMethod'
import DirectImaging from './pages/differentMethods/DirectImagine'
import DirectImagingDemo from './pages/DirectImagingSimulation'
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import GravitationalMicrolensingSimulation from './pages/GravitationalMicrolensingSimulaton'
import GravitationalMicroLensing from './pages/differentMethods/GravitationalMicrolensing'
import Chatbot from './component/Chatbot'
import SubchpaterContent from './pages/SubchpaterContent.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { UserProvider } from './contexts/userContext.jsx'
import AddQuiz from './pages/AddQuiz.jsx'
import Quiz from './pages/Quiz.jsx'
import BlogPage from './pages/WriteBlog.jsx'
import TestBlog from './pages/Blogpage.jsx'

function App() {
    // console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID)
 
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
            <Route path='/howwefindexoplanets/' element={<HowWeFindExoplanets/>} />
                <Route path='/transitmethod' element={<TransitMethod />} /> 
                <Route path='/radialvelocitymethod' element={<RadialVelocityMethod />} />
                <Route path='/directimaging' element={<DirectImaging />} />
                <Route path='/GravitationalMicroLensing' element={<GravitationalMicroLensing />} />
        <Route path='/planet' element={<ExoplanetPage />} />
        <Route path='/stars' element={<StarPlanetPage />} />
        <Route path='/video' element={<SolarSystem />} />
        <Route path='/test' element={<Planets />} />
        <Route path='/teacherblog' element={<TeacherBlog />} />
        <Route path='/radialvelocity' element={<RadialVelocity />} />
        <Route path='/transitsimulator' element={<TransitSimulator />} />
        <Route path='/directimagingdemo' element={<DirectImagingDemo />} />
        <Route path='/GravitationalMicrolensingSimulation' element={<GravitationalMicrolensingSimulation />} />
        <Route path='/subchaptercontent' element={<SubchpaterContent />} />
        <Route path='/addquiz' element={<AddQuiz />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/blog' element={<BlogPage />} />
        <Route path='/testblog' element={< TestBlog />} />
      </Routes>
      </Router>
      </UserProvider>
    </GoogleOAuthProvider>
  )
}

export default App;
