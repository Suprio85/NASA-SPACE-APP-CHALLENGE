import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import bgImage from '../assets/bg_3.png';
import Button from '../component/button';
const LogInPage = () => {
    return (
        <div className='flex justify-center items-center h-screen '>
            <div className='absolute w-full h-screen overflow-hidden -z-40'>
                <img src={bgImage} alt="bgImage" className='w-screen h-screen object-cover absolute top-0 left-0' />
            </div>
            <div className='bg-slate-50 rounded-lg bg-opacity-10 w-1/3 h-1/2 flex flex-col justify-center items-center'>
                <div>
                    <h1 className='text-3xl font-Saira font-medium text-slate-200'>LOG IN</h1>
                </div>
                <div className='w-full flex  justify-center'>
                    <form className='flex flex-col items-center justify-center  w-1/2 '>
                        <input type="text" placeholder='Username' className='border-2 h-10 border-slate-950 bg-slate-950 bg-opacity-40 w-full mt-4 mb-2 text-2xl flex justify-center items-center pl-2' />
                        <input type="password" placeholder='Password' className='border-2 h-10 border-slate-950 bg-slate-950 bg-opacity-40 w-full mb-4 text-2xl flex justify-center items-center pl-2' />
                    
                        <button className='bg-slate-950 text-white w-full py-2 my-4'>
                            <Button text='Log In' />
                            </button>
                    </form>
                </div>
                <div>
                    <Link to='/signup' className='text-slate-950'>Don't have an account? Sign Up</Link>
                </div>
            </div>
        </div>
    )
}
export default LogInPage;