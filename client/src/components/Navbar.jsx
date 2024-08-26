import React from "react";
// import navlink to change the anchor tag as it does refresh the page,change all a's to (navlink) and href's to (to)...
import { NavLink } from "react-router-dom";
import {userContext} from "../App";
import { useContext } from "react";

const Navbar = () => {
  const {state,dispatch} = useContext(userContext);

  // collapsing navbar automatically when a link is clicked
  const collapseNavbar = () => {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  // Check if the screen width is less than or equal to 928px
  if (window.innerWidth <= 920 && navbarCollapse.classList.contains('show')) {
    navbarToggler.click(); // Simulate a click on the navbar toggler to collapse the menu
  }
};

  
  
  const RenderNavLinks=()=>{
    // if state is true then dont show the login/registration button links
    if(state){
      return(
        <>
          <li className="nav-item active">
              <NavLink className="nav-link" to="/" onClick={collapseNavbar}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" onClick={collapseNavbar}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/projects" onClick={collapseNavbar}>
                Projects
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" onClick={collapseNavbar}>
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/logout" onClick={collapseNavbar}>
                Logout
              </NavLink>
            </li>
        </>
      )
    }
    else{
      // show the login and registration buttons
      return(
      <>
        <li className="nav-item active">
              <NavLink className="nav-link" to="/" onClick={collapseNavbar}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" onClick={collapseNavbar}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/projects" onClick={collapseNavbar}>
                Projects
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" onClick={collapseNavbar}>
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login" onClick={collapseNavbar}>
                Log In
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/registration" onClick={collapseNavbar}>
                Sign Up
              </NavLink>
            </li>
      </>
      )
    }
  }



  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#F8F9FA"}}>
        <NavLink className="navbar-brand" to="/">
          <img src="/assets/images/mainlogo.png" style={{height:"47px",width:"136px", borderRadius:"7px",marginLeft:"5px"}} />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">

            {/* call the function to display the links accordingly */}

            <RenderNavLinks/>

          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
