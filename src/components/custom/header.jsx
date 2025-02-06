import React from 'react'
import logo from '/logo.jpg'

function header() {
  return ( 
    <div>
        <img src= {logo} alt="logo" className='w-12 h-12'/>
    </div>
  )
}

export default header;