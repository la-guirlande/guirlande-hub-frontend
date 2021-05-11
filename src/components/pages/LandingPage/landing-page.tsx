import React from 'react'
import Navbar from '../Navbar/navbar'

interface LandingPageProps{
  isValid:  boolean
}
const LandingPage:React.FC<LandingPageProps> = (props) => {
  return (
    <div>
      <Navbar />
      {
        props.isValid ? <div>Hello</div>: null
      }
      
    </div>
  )
}

export default LandingPage;
