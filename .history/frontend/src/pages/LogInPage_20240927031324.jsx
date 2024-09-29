import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import bgImage from '../assets/bg_3.png';
const LogInPage = () => {
    return (
        <div className='flex justify-center items-center h-screen '>
            <div className='absolute w-full h-screen overflow-hidden -z-40'>
                <img src={bgImage} alt="bgImage" className='w-screen h-screen object-cover absolute top-0 left-0' />
            </div>
            <div className='bg-slate-50 rounded-lg opacity-25 w-1/3'>
            <h1 className='text-4xl font-bold text-slate-950'>Log In</h1>
                <form className='flex flex-col items-center justify-center w-3/4'>
                    <input type="text" placeholder='Username' className='border-b-2 border-slate-950 w-full my-4' />
                    <input type="password" placeholder='Password' className='border-b-2 border-slate-950 w-full my-4' />
                    <button className='bg-slate-950 text-white w-full py-2 my-4'>Log In</button>
                </form>
                <Link to='/signup' className='text-slate-950'>Don't have an account? Sign Up</Link>
            </div>
        </div>
    )
}
export default LogInPage;