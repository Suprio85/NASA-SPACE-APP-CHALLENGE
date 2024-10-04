import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext.jsx';

const Btn = ({ text }) => {
    return (
        <div className='bg-slate-900 border-2 border-slate-950 border-opacity-20 mt-1 bg-opacity-60 text-slate-300 w-40 flex justify-center items-center p-1 rounded-md'>
            <button className=''>{text}</button>
        </div>
    )
}
const Navbar = () => {
    const { userData, setUserData } = useUserContext();

    const handleLogout = () => {
        setUserData(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
    };


    return (
        <div className='flex  justify-between items-center h-16  text-slate-300 font-Saira ' style={{ zIndex: '100000' }}>


            <div className=' z-50 fixed text-2xl right-10 top-10 flex flex-col justify-end items-end' style={{ zIndex: '100000' }}>
                <Link to='/'>
                        <Btn text='Home' />
                </Link>
                {userData ? (<>
                    <Btn text='Profile' />
                    <div className='' onClick={handleLogout}>
                        <Btn text='Log Out' />
                        </div>
                </>) : (<>
                    <Link to='/login'>
                        <Btn text='Log In' />
                    </Link>
                    <Link to='/signup'>
                        <Btn text='Sign Up' />
                    </Link>
                </>)
                }
                <Link to='/quiz'>
                    <Btn text='Quiz' />
                </Link>
            </div>
        </div>
    )
}
export default Navbar;