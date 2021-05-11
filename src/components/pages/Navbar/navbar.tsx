import React from 'react';
import logo from '../../../images/Logo-transparent.png'

const Navbar = () => {
  return (
    <div className="sticky top-0 z-40 lg:z-50 w-full max-w-8xl mx-auto bg-black flex-none flex">
      <div className="flex-none pl-4 sm:pl-6 xl:pl-8 flex items-center border-b border-gray-200 lg:border-b-0 lg:w-60 xl:w-72">
        <a href="/" className="overflow-hidden w-10 md:w-auto">
          <span className="sr-only">La Guirlande</span>
          <h1 className="font-quicksand font-normal text-guirlande text-2xl">La Guirlande</h1>
          <img src={logo} alt="La Guirlande" />
        </a>
      </div>
      <div className="flex-auto border-b border-gray-200 h-18 flex items-center justify-between px-4 sm:px-6 lg:mx-6 lg:px-0 xl:mx-8">

      </div>
    </div>
  )
}

export default Navbar;
