import React from 'react'
import logo from '../logo.png'

function WelcomeArea() {
  return (
    <div className='welcome-container'>
        {/* <TelegramIcon /> */}
        <img className='welcome-page-img' src={logo} alt = "logo here"></img>
        {/* <img className='welcome-page-img' src='logo.png' alt = "logo here"></img> */}
        <p className='welcome-text' style={{textAlign:"center"}}>Start connecting with people by joining a conversation</p>
    </div>
  )
}

export default WelcomeArea