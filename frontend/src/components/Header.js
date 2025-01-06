import React from 'react'
import Logo from './Logo'

const Header = () => {
  return (
    <header className="h-16 shadow-md">
      <div className="h-full container mx-auto flex items-center px-2 justify-between">
        <Logo w={120} h={60} />

        <div>Search</div>

        <div>user and Cart icon</div>
      </div>
    </header>
  );
}

export default Header