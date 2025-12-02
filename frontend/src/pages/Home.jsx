import React from 'react'
import { AppData } from '../context/AppContext';

const Home = () => {
  const { logoutUser } = AppData();
  return (
    <>
      <div>Home</div>
      <div className="flex w-[100px] m-auto mt-40">
        <button
          onClick={logoutUser}
          className="bg-red-500 text-white p-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default Home