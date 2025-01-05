import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function App() {


  return (
    <>
      <Helmet>
        <title>Waghade Skin Clinic - Best Skin Care Services</title>
        <meta name="description" content="Welcome to Waghade Skin Clinic. We provide the best skin care services for all your dermatology needs." />
        <meta name="keywords" content="Skin Clinic, Dermatology, Skin Care, Waghade Skin Clinic" />
        <meta property="og:title" content="Waghade Skin Clinic" />
        <meta property="og:description" content="Offering the best skin care and dermatology services." />
        <meta property="og:image" content="https://cdn-icons-png.flaticon.com/128/11506/11506245.png" />
        <meta property="og:url" content="https://waghadeskinclinics.in" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App