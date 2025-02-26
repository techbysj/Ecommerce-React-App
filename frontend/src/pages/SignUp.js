import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import loginIcons from '../assest/signin.gif'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import imageToBase64 from '../helper/imageToBase64'

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

      const handleUploadPic = async (e) =>{
        const file = e.target.files[0];
        
        const imagePic = await imageToBase64(file)
        console.log("imagePic", imagePic)
        setData((preve)=>{
          return{
            ...preve,
            profilePic: imagePic

          }
        })

      }

      const handleSubmit = (e) => {
        e.preventDefault();
      };

      console.log("data login", data);

  return (
    <section id="signup">
      <div className="mx-auto container p-7">
        <div className="bg-white p-4 py-5 w-full max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic||loginIcons} alt="loginIcon" />
            </div>
            <form>
              <label>
              <div className="text-xs bg-opacity-75 bg-slate-300 py-2 pb-2 pt-1 cursor-pointer text-center absolute bottom-0 w-full">
                Upload Picture
              </div>
              <input type="file" className="hidden"  onChange={handleUploadPic}/>
              </label>
            </form>
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
                required
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
                required
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
                name="Enter Password"
                value={data.password}
                onChange={handleOnChange}
                required
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
                placeholder="Enter Confirm Password"
                className="w-full h-full outline-none bg-transparent"
                name="Enter Confirm Password"
                value={data.password}
                onChange={handleOnChange}
                required
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