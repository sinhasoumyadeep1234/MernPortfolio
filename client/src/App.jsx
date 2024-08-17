import React, { createContext, useReducer } from "react";
import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import Projects from "./components/Projects";
import ProjectDetails from "./components/ProjectDetails";
import Login from "./components/Login";
import Errorpage from "./components/Errorpage";
import Logout from "./components/Logout";
import { intitialstate, reducer } from "../src/reducer/useReducer";

// import route to mention the routes and to display the particular component

// 1. Create a context
export const userContext = createContext();

const Routing = () => {
  return (
    // CREATE THE ROUTES AND THEIR PATHS ..ENCLOSE INTO SWTICH
    <Routes>
      {/* now home component will get rendered along with all component..thus to prevent this we have a keyword exact to only render the component when the path is = / else not... */}
      {/* Below is the new syntax of defining routes and attach to respective components as elements */}

      <Route exact path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      {/* project route is different as it contains 3 sub components */}
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />

      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />

      {/* if none of the page/route matches then show error page..use path='*' as non matching route */}
      <Route path="*" element={<Errorpage />} />
    </Routes>
  );
};

function App() {
  // 2. use reducer
  const [state, dispatch] = useReducer(reducer, intitialstate);
  return (
    <>
      <userContext.Provider value={{ state, dispatch }}>
        {/* // NAVBAR IS COMMON HENCE WE WILL NOT ADD INTO ROUTE */}
        <Router>
          <Navbar />
          <Routing />
        </Router>
      </userContext.Provider>
    </>
  );
}

export default App;
