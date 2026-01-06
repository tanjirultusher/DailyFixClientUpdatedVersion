import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';


const Root = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <Navbar className = "mb-2" />
        <main className="grow">
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default Root;
