import React from 'react';
import { useState } from 'react';
import bgImage from '../assets/bg_3.png';
import planet3 from "../assets/SVG/planet1.svg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../contexts/userContext.jsx';
const Registration = () => {
    const { setUserData } = useUserContext();


   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [error, setError] = useState({
    staus: false,
    message: '',
   });

    const handleRegistration = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError({
                status: true,
                message: 'Passwords do not match',
            });
            return;
        }
        axios.post('http://localhost:3000/api/v1/auth/register', {
            name: name,
            email: email,
            password: password,
        })

        .then(response => {
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userData', JSON.stringify(response.data.user));
            setUserData(response.data.user);
            setError({
                status: false,
                message: '',
            });
            console.log('Registration successful');
            useNavigate('/');
        }).catch(error => {
            console.error('Error logging in:', error);
            setError({
                status: true,
                message: error.response.data.message,
            });
        });
    
    };




    return (
        <div className='flex justify-center items-center h-screen absolute top-0 left-0 w-full'>
            <div className='absolute w-full h-screen overflow-hidden -z-40'>
                <img src={bgImage} alt="bgImage" className='w-screen h-screen object-cover absolute top-0 left-0' />
            </div>
            <div className='bg-slate-50 rounded-lg bg-opacity-10 w-1/3 h-min-1/2 py-10 flex flex-col justify-center items-center'>
                <div>
                    <h1 className='text-3xl font-Saira font-medium text-slate-200'>REGISTRATION</h1>
                </div>
                <div className='w-full flex  justify-center'>
                    <form className='flex flex-col items-center justify-center  w-1/2 '>
                        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder='Name' className='border-2 h-10 border-slate-950 bg-slate-950 bg-opacity-40 w-full mt-4 mb-2 text-2xl flex justify-center items-center pl-2' />
                        <input value={email} onChange={(e)=>setEmail(e.target.value)}  type="text" placeholder='Email Address' className='border-2 h-10 border-slate-950 bg-slate-950 bg-opacity-40 w-full mb-2 text-2xl flex justify-center items-center pl-2' />
                        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Password' className='border-2 h-10 border-slate-950 bg-slate-950 bg-opacity-40 w-full mb-2 text-2xl flex justify-center items-center pl-2' />
                        <input value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type="password" placeholder='Confirm Password' className='border-2 h-10 border-slate-950 bg-slate-950 bg-opacity-40 w-full mb-2 text-2xl flex justify-center items-center pl-2' />

                        <button className='btn  w-full overflow-hidden relative bg-slate-900 '
                        onClick={handleRegistration}
                        >
                            <div className='z-10 text-slate-200 font-Saira text-xl'  >Sign Up</div>
                            <img src={planet3} alt="planet3" className="h-96 object-cover absolute opacity-50" />
                        </button>
                    </form>
                </div>
                <p className='text-red-500'>{error.status && error.message}</p>
            </div>
        </div>
    )
}
export default Registration;