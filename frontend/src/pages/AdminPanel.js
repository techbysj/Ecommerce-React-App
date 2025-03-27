import React, { useEffect } from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {

  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate()

  useEffect(()=>{
    if(user?.role !== ROLE.ADMIN){
      navigate('/')
    }
  })


  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className="bg-slate-300 h-40 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <IoPersonCircleOutline />
            )}
          </div>
          <h1 className="capitalize text-xl font-semibold">{user?.name}</h1>
          <p className="text-sm">{user?.role}</p>
        </div>
        {/* {***navigation***} */}
        <nav className="p-4 grid">
          <Link
            className="p-2 hover:bg-slate-100 cursor-pointer"
            to={"/admin-panel"}
          >
            Dashboard
          </Link>
          <Link
            className="p-2 hover:bg-slate-100 cursor-pointer"
            to={"all-users"}
            >
            All Users
          </Link>

          <Link
            className="p-2 hover:bg-slate-100 cursor-pointer"
            to={"all-products"}
          >
            All Products
          </Link>
          <Link className="p-2 hover:bg-slate-100 cursor-pointer">Orders</Link>
        </nav>
      </aside>

      <main className='w-full h-full p-5'>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPanel