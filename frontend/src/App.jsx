import './App.css';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Registration from './pages/Registration';
import JourneyWithOrbit from './pages/JourneyWithOrbit'; // Ensure proper file casing here as well
import Teacherblog from './pages/Teacherblog'; // Ensure this import matches the component name exactly
import TransitSimulation from './pages/TransitSimulation';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LogInPage />} />
        <Route path='/signup' element={<Registration />} />
        <Route path='/journeywithorbit' element={<JourneyWithOrbit />} />
        <Route path='/teacherblog' element={<Teacherblog />} /> 
        <Route path='/transitsimulation' element={<TransitSimulation />} />
      </Routes>
    </Router>
  );
}

export default App;
