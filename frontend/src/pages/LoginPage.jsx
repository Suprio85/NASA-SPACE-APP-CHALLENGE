import React from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useUserContext } from '../contexts/userContext.jsx';
import bgImage from '../assets/bg_3.png';
import planet3 from "../assets/SVG/planet1.svg";
import planet2 from "../assets/SVG/planet2.svg";
import { useNavigate } from 'react-router-dom';

const LogInPage = () => {
  const { setUserData } = useUserContext();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse) => {
    console.log('Logged in:', credentialResponse);
    axios.post('http://localhost:3000/api/v1/auth/google-login', {
      token: credentialResponse.credential,
    })
    .then(response => {
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
      setUserData(response.data.user);

      navigate('/');
    })
    .catch(error => {
      console.error('Error logging in:', error);
    });
  };


  const handleLogin = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/api/v1/auth/login', {
      email: email,
      password: password,
    })
    .then(response => {
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
      setUserData(response.data.user);
      navigate('/');
    })
    .catch(error => {
      console.error('Error logging in:', error);
    });
  };

  return (
    <div className="flex justify-center items-center h-screen absolute top-0 left-0 w-full">
      <div className="absolute w-full h-screen overflow-hidden -z-40">
        <img src={bgImage} alt="bgImage" className="w-screen h-screen object-cover absolute top-0 left-0" />
      </div>
      <div className="bg-slate-50 rounded-lg bg-opacity-10 w-1/3 p-8 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-Saira font-medium text-slate-200 mb-6">LOG IN</h1>
        <form className="flex flex-col items-center justify-center w-1/2 ">
          <input 
            type="text" 
            placeholder="Username" 
            className="border-2 h-12 border-slate-950 bg-slate-950 bg-opacity-40 w-full mb-2 text-xl text-slate-200 flex justify-center items-center pl-4 rounded"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="border-2 h-12 border-slate-950 bg-slate-950 bg-opacity-40 w-full mb-2 text-xl text-slate-200 flex justify-center items-center pl-4 rounded"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="btn w-full h-12 overflow-hidden relative bg-slate-900 rounded mb-4"
          onClick={handleLogin}
          >
            <div className="z-10 text-slate-200 font-Saira text-xl">Log In</div>
            <img src={planet3} alt="planet3" className="h-full w-full object-cover absolute opacity-50" />
          </button>
          <div className="w-full">
            <button  className="btn w-1/2 h-12 overflow-hidden relative rounded-lg mb-4">
            <img src={planet2} alt="planet2" className="h-full w-full object-cover absolute opacity-50" />
            <GoogleLogin 
              onSuccess={handleLoginSuccess}
            />
            </button>
          </div>
        </form>
        <div className="text-slate-200 mt-5 text-xl font-Saira">
          <Link to="/signup">Don't have an account? Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;