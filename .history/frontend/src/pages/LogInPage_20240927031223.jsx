import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import bgImage from '../assets/bg_3.png';
const LogInPage = () => {
    return (
        <div className='flex justify-center items-center h-screen bg-slate-950'>
            <div className='absolute w-full h-screen overflow-hidden -z-40'>
                <img src={bgImage} alt="bgImage" className='w-screen h-screen object-cover absolute top-0 left-0' />
            </div>
            <div className=' '>
                
            </div>
        </div>
    )
}
export default LogInPage;