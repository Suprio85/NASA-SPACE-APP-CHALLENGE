import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import bgImage from '../assets/bg_3.png';
import planet3 from "../assets/SVG/planet1.svg";
const LogInPage = () => {
    return (
        <div className='flex justify-center items-center h-screen absolute top-0 left-0 w-full'>
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

                        <button className='btn  w-full overflow-hidden relative bg-slate-900 mt-5'>
                            <div className='z-10 text-slate-200 font-Saira text-xl'  >Log In</div>
                            <img src={planet3} alt="planet3" className="h-96 object-cover absolute opacity-50" />
                        </button>
                    </form>
                </div>
                <div className='text-slate-200 mt-5 font-Saira'>
                    <Link to='/signup' className=''>Don't have an account? Sign Up</Link>
                </div>
            </div>
        </div>
    )
}
export default LogInPage;