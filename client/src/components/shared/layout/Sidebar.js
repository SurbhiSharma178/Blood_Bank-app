import React from 'react'
// import { userMenu } from './menus/UserMenu'
import { Link, useLocation } from 'react-router-dom'
import '../../../../src/Style/Layout.css'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  // GET USER State

  const { User } = useSelector(state => state.auth)
  const location = useLocation();


  return (
    <>
      <div className="sidebar">
        <div className="menu">
          {
            User?.role === 'Organisation' && (
              <>
                <div className={`menu-item ${location.pathname === '/' && "active"}`}>
                  <i className='fa-solid fa-warehouse'></i>
                  <Link to='/'>Inventory</Link>
                </div>

                <div className={`menu-item ${location.pathname === '/donar' && "active"}`}>
                  <i className='fa-solid fa-hand-holding-medical'></i>
                  <Link to='/donar'>Donar</Link>
                </div>

                <div className={`menu-item ${location.pathname === '/hospital' && "active"}`}>
                  <i className='fa-regular fa-hospital'></i>
                  <Link to='/hospital'>Hospital</Link>
                </div>
              </>
            )}


          {
            (User?.role === 'donar' || User?.role === 'hospital') && (
              <>
                <div className={`menu-item ${location.pathname === '/Orginastion' && "active"}`}>
                  <i className='fa-regular fa-building'></i>
                  <Link to='/orginastion'>Organisation</Link>
                </div>
              </>
            )
          }

          {
            (User?.role === 'hospital') && (
              <>
                <div className={`menu-item ${location.pathname === '/consumer' && "active"}`}>
                  <i className='fa-regular fa-building'></i>
                  <Link to='/consumer'>Consumer</Link>
                </div>
              </>
            )
          }

          {
            (User?.role === 'donar') && (
              <>
                <div className={`menu-item ${location.pathname === '/donation' && "active"}`}>
                  <i className='fa-regular fa-building'></i>
                  <Link to='/donation'>Donation</Link>
                </div>
              </>
            )
          }




          {/* {userMenu.map((menu)=>{
            const isActive=location.pathname===menu.path
            return (
            <div className={`menu-item ${isActive && 'active'}`} key={menu.name}>
              <i className={menu.icon}/> 
              <Link to={menu.path}>{menu.name}</Link>
            </div>
            )
          })} */}
        </div>
      </div>
    </>
  )
}

export default Sidebar
