import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    return (
        <div className='flex  justify-between items-center h-16  text-slate-300 font-Saira ' style={{zIndex:'10000'}}>
            <div className='pl-8'>
                <Link to='/'>
                    <h1 className='text-3xl  font-bold fixed top-5 right-10' style={{zIndex:'10000'}}>Orbit</h1>
                </Link>
            </div>
            <div className='mt-5  fixed text-2xl right-10 top-12 flex flex-col justify-end items-end' style={{zIndex:'10000'}}>
                <Link to='/login'>
                    <button className=''>Log In</button>
                </Link>
                <Link to='/signup'>
                    <button className=''>Sign Up</button>
                </Link>
                <Link to='/quiz'>
                    <button className=''>Quiz</button>
                </Link>
            </div>
        </div>
    )
}
export default Navbar;