import React from 'react'
import { MdOutlineBloodtype } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import {useSelector} from 'react-redux'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

const Header = () => {

  const {User}= useSelector((state)=>state.auth)
  // console.log(User?.OrganisationName);
  
  const navigate=useNavigate();
  const location= useLocation();

  // Logout user
  const handleLogout=()=>{
    localStorage.clear();
    toast.success("Logout Successfully" )
    navigate('/login');
   
  }
  return (
    <>
      <div className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand h1">
          <MdOutlineBloodtype /> Blood Bank App
          </div>
          <ul className="navbar-nav flex-row">
          <li className="nav-item ">
              <p className="nav-link"><FaRegUserCircle/> Welcome {User?.name || User?.hospitalName || User?.OrganisationName}{" "} 
              &nbsp;
              <span className="badge text-bg-secondary">{User?.role}</span> </p>
            </li>
            {
              (location.pathname==='/'|| location.pathname==="/donar" || location.pathname==="/hospital")? (
                <li className="nav-item mx-3">
              <Link to='/analytics' className="nav-link">
               AnaLytics
              </Link>
            </li>
              ):(
               
                  <li className="nav-item mx-3">
                <Link to='/' className="nav-link">
                 Home
                </Link>
              </li>
              )
            }
            <li className="nav-item mx-3">
            <button className="btn btn-danger" onClick={handleLogout}> Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Header
