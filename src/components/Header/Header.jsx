import React from 'react'
import logoBricsa from '../../assets/BRICSA_Logo.png'
import './Header.css'

const Header = () => {
    return (
    <header>
    <div className='LogoBricsa'>
        <img src={logoBricsa} alt="Logo BRICSA" />
    </div>
  </header>
  )
  
}

export default Header;