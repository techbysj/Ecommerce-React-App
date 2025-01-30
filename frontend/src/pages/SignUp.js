import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import loginIcons from '../assest/signin.gif'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'

const SignUp = () => {
      const [showPassword, setShowPassword] = useState(false);
      const [data, setData] = useState({
        email: "",
        password: "",
      });

      const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((preve) => {
          return {
            ...preve,
            [name]: value,
          };
        });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
      };

      console.log("data login", data);

  return (
    <section id="signup">
      <div className="mx-auto container p-7">
        <div className="bg-white p-4 py-5 w-full max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcons} alt="loginIcon" />
          </div>

          <form
            className="w-full max-w-md mx-auto pt-8"
            onSubmit={handleSubmit}
          >
            <div className="grid">
              <label>Name</label>
            </div>
            <div className="bg-slate-200 p-4">
              <input
                type="text"
                placeholder="Enter Your Name"
                className="w-full h-full outline-none bg-transparent"
                name="name"
                value={data.name}
                onChange={handleOnChange}
              />
            </div>
            <div></div>
            <div className="grid">
              <label>Email</label>
            </div>
            <div className="bg-slate-200 p-4">
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full h-full outline-none bg-transparent"
                name="email"
                value={data.email}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label>Password</label>
            </div>
            <div className="bg-slate-200 p-4 flex">
              <input
                type={showPassword ? "" : "password"}
                placeholder="Enter Password"
                className="w-full h-full outline-none bg-transparent"
                name="password"
                value={data.password}
                onChange={handleOnChange}
              />
              <div className="flex justify-between items-center">
                <div className="cursor-pointer">
                  {showPassword ? (
                    <FaEyeSlash onClick={() => setShowPassword(false)} />
                  ) : (
                    <FaEye onClick={() => setShowPassword(true)} />
                  )}
                </div>
              </div>
            </div>
            <div>
              <label>Confirm Password</label>
            </div>
            <div className="bg-slate-200 p-4 flex">
              <input
                type={showPassword ? "" : "password"}
                placeholder="Enter Password"
                className="w-full h-full outline-none bg-transparent"
                name="password"
                value={data.password}
                onChange={handleOnChange}
              />
              <div className="flex justify-between items-center">
                <div className="cursor-pointer">
                  {showPassword ? (
                    <FaEyeSlash onClick={() => setShowPassword(false)} />
                  ) : (
                    <FaEye onClick={() => setShowPassword(true)} />
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <input type="checkbox" />
                <label className="ml-2">Remember Me</label>
              </div>
            </div>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[140px] rounded-full hover:scale-105 "
            >
             Sign Up
            </button>
          </form>
          <div className="flex justify-center items-center mt-4">
            <p className="mr-2">Already have an account?</p>
            <Link
              to={"/login"}
              className="hover:underline text-red-400 hover:text-red-500"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp