import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    return (
        <div className='flex justify-between items-center h-16  text-slate-200 font-Saira z-50'>
            <div className='pl-8'>
                <Link to='/'>
                    <h1 className='text-3xl z-50 font-bold fixed top-5 right-20'>Orbit</h1>
                </Link>
            </div>
            <div className=' z-50 fixed text-2xl right-20 top-12 flex flex-col justify-end items-end'>
                <Link to='/login'>
                    <button className=''>Log In</button>
                </Link>
                <Link to='/signup'>
                    <button className=''>Sign Up</button>
                </Link>
            </div>
        </div>
    )
}
export default Navbar;