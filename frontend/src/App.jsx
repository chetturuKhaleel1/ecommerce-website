import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './pages/Auth/Navigation'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  useEffect(() => {
    // ✅ Dynamically load Razorpay script
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className='py-3'>
        <Outlet />
      </main>
    </>
  );
};

export default App;
