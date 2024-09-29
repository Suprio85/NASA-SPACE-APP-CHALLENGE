import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    return (
        <div className='flex  h-16 fixed text-slate-200 font-Saira'>
            <div className='pl-8'>
                <Link to='/'>
                    <h1 className='text-3xl font-bold'>Orbit</h1>
                </Link>
            </div>
            <div className="w-1/2 z-50 ml-auto   flex justify-center items-center">
                <div className="flex justify-around  w-full font-Rajdhani font-medium text-slate-200 text-2xl">
                        <Link to="/">Home</Link>
                        <Link to="/Dashboard">Dashboard</Link>
                    </div>
            </div>
        </div>
    )
}
export default Navbar;