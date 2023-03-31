import React from 'react'
import Home from './Home'
import axios from "axios";
import Sidebar1 from './Sidebar1';
import Femura from './asset/Femura_Logo.png'
const Dashboard = () => {
    
  return (
    <div className='flex fixed'>
      <Sidebar1 />
      <div className="flex flex-grow bg-light-white">
      <img  src={Femura} alt="" />
      </div>
    </div>
  );
}

export default Dashboard