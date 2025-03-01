import React from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';

const AdminPanel = () => {

  const user = useSelector((state) => state?.user?.user);


  return (
    <div className="min-h-[calc(100vh-120px)] flex">
      <aside className="bg-white min-h-full w-full max-w-60">
        <div className="bg-red-600 h-20 flex justify-center items-center">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                className="w-10 h-10 rounded-full"
                alt={user?.name}
              />
            ) : (
              <IoPersonCircleOutline />
            )}
          </div>
        </div>
      </aside>

      <main></main>
    </div>
  );
}

export default AdminPanel