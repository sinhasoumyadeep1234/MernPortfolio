import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

const Errorpage = () => {
  return (
    <>
        <div id="not-found">
            <div className="notFound">
                <div className="notFound404">
                    <h1 style={{color:"black"}}>404</h1>
                </div>
                <h2>We are sorry, Page not found!</h2>
                <p className='mb-5'>The page you are looking for might have been removed , had its name changed or is temporarily unavailable. Check in case of any typo</p>
                <NavLink to="/" style={{textDecoration:"none",fontWeight:"bolder"}}>Back to Homepage</NavLink>
            </div>
        </div>
    </>
  )
}

export default Errorpage