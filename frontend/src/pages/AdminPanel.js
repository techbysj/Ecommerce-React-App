import React from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';

const AdminPanel = () => {

  const user = useSelector((state) => state?.user?.user);


  return (
    <div className="min-h-[calc(100vh-120px)] flex">
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
            <p className='text-sm'>{user?.role}</p>
        </div>
      </aside>

      <main></main>
    </div>
  );
}

export default AdminPanel