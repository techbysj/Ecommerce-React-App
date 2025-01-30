import React from "react";
import Logo from "./Logo";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-2 justify-between">
         <Link to="/">
          <Logo w={120} h={60} />
        </Link>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-4">
          <input
            type="text"
            placeholder="Search Product Here"
            className="w-full outline-none "
          />
          <div className=" text-lg min-w-[50px] h-8 bg-red-500 flex items-center justify-center rounded-r-full text-white">
            <FaSearch />
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div>
            <FaUser className="text-2xl cursor-pointer " />
          </div>
          <div>
            <span>
              <FaShoppingCart className="text-2xl cursor-pointer  relative" />
            </span>
            <div className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center ml-4 text-white absolute top-2">
              <p className="text-sm">0</p>
            </div>
          </div>
          <div>
            <Link to="/login">
            <button className="bg-red-500 text-white  hover:bg-red-300 px-4 py-2 rounded-full">
              Login
            </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
