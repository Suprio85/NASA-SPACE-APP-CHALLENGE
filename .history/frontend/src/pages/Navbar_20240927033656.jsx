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
            <div className='flex justify-center items-center right-0'>
                <div className='pr-8'>
                    <Link to='/login'>
                        <button className='btn'>Log In</button>
                    </Link>
                    <Link to='/login'>
                        <button className='btn'>Log In</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Navbar;