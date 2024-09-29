import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    return (
        <div className='flex justify-between items-center h-16  text-slate-200 font-Saira'>
            <div className='pl-8'>
                <Link to='/'>
                    <h1 className='text-3xl font-bold fixed top-5 right-20'>Orbit</h1>
                </Link>
            </div>
            <div className='pr-8'>
                <Link to='/login'>
                    <button className=' fixed text-3xl right-20 top-12'>Log In</button>
                </Link>
            </div>
        </div>
    )
}
export default Navbar;