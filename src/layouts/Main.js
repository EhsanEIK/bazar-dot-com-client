import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='container mx-auto mt-10'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;