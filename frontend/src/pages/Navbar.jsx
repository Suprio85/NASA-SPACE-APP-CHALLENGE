import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext.jsx';

const Navbar = () => {
   const { userData,setUserData } = useUserContext();

   const handleLogout = () => {
        setUserData(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
   };


    return (
        <div className='flex  justify-between items-center h-16  text-slate-300 font-Saira '>
            <div className='pl-8'>
                <Link to='/'>
                    <h1 className='text-3xl z-50 font-bold fixed top-5 right-10'>Orbit</h1>
                </Link>
            </div>
            <div className='mt-5 z-50 fixed text-2xl right-10 top-12 flex flex-col justify-end items-end'>
                {userData ? (<>
                    <button className=''>{userData.name}</button>
                    <button className='' onClick={handleLogout}>Log out</button>
                </>):(<>
                    <Link to='/login'>
                    <button className=''>Log In</button>
                </Link>
                <Link to='/signup'>
                    <button className=''>Sign Up</button>
                </Link>
                </>)
                }
                <Link to='/quiz'>
                    <button className=''>Quiz</button>
                </Link>
            </div>
        </div>
    )
}
export default Navbar;