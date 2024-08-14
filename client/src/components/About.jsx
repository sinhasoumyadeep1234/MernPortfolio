import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

const About = () => {
  const history=useNavigate();

  // now the data got by fetch api needs to be stored in a state then can be set in the appropriate places of our component
  const [user, setuser] = useState({});

  const callAboutPage=async()=>{
    try{
      // call fetch request to the backend route /about to authenticate the user..note the form must have get method..as the authentication logic of about page is written for get request
      const response=await fetch('/about',{
        // for the header and body the things will change
        method: "GET",
        headers:{
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        // this credentials field is important for getting cookies/tokens
        credentials:"include"
      });

      
      // if we get the data then no problem add the data in the about component template else throw error

      if(response.status!==200){
        // throw error
        const error=new Error(res.error);
        throw error;
      }

      // now if a user is present having the credentials then in response we will get the whole collection
      const data=await response.json();
      console.log("User data returned: ",data);
      // save the data in the state
      setuser({_id:data._id,name:data.name,email:data.email,profession:data.profession,phone:data.phone});
      

    }catch(err){
      console.log(err);
      // means user is not authenticated redirect to login page
      history("/login")
    }
  };

  // now the moment about page opens we need to validate the user as his details needs to be updated on the about page dynamically..thus we will use useeffect hook
  useEffect(() => {
    console.log("Calling the function to fetch data /about...");
    setuser({});
    callAboutPage();
  }, []);
  

  return (
    <>
      <div className="container aboutContainer glow-effect my-5 p-4">
        {/* now we willl have a form as all the data in the about page will come dynamically from backend..method must be get */}
        <form method='GET'>
          {/* now we will have the grid for the layout */}
          <div className="row mb-4">
            
            <div className="col-md-4">
              {/* add the image */}
              <img src={user.name==="Soumyadeep Sinha"?"/assets/images/profilepic.jpg":"/assets/images/about.png"} alt="aboutpic" className='img-fluid rounded-pill' style={{maxWidth: "150px" }}/>
            </div>
            
            {/* now for the details like name,profession */}
            <div className="col-md-6">
              <div className="profileheading">
                <h5>{user.name}</h5>
                <h6>{user.profession}</h6>
                <p className='profile-rating mt-3 mb-5'>Ranking : <span>1/100</span></p>

                {/* Toggle on click sliding tab */}
                <ul className='nav nav-tabs' id='myTab' role='tablist'>
                  <li className='nav-item'>
                    <a className='nav-link active' id='home-tab' data-toggle='tab' href="#home" role='tab' aria-controls='home' aria-selected='true'>About</a>
                  </li>
                  <li className='nav-item'>
                  <a className='nav-link' id='profile-tab' data-toggle='tab' href="#profile" role='tab' aria-controls='profile' aria-selected='false'>Timeline</a>
                  </li>
                </ul>
              </div>
            </div>
              
              {/* edit profile button */}
              <div className="col-md-2">
                <input type="submit" className='profileEditbutton btn btn-primary' value="Edit Profile" name='btnAddMore'/>
              </div>
          </div>

          {/* profile links */}
          <div className="row">
            {/* left side url links */}
            <div className="col-md-4">
              <div className="profileWork">
                <p>Work Links</p>
                {/* links */}
                <a href="https://www.linkedin.com/in/sinha-02122001-soumo/">LinkedIn</a><br/>
                <a href="https://github.com/sinhasoumyadeep1234">Github</a><br/>
                <a href="https://www.facebook.com/soumyadeep.sinha.501/">Facebook</a><br/>
                <a href="https://www.instagram.com/1_._mr_sinha_._1">Instasgram</a>
              </div>
            </div>

            {/* right side data toggle */}
            
            <div className="col-md-8 pl-5 about-info">
              {/* now the contents of the tab will come */}
              <div className="tab-content profile-tab" id='myTabContent'>

                {/* now when we click on about about writings shows up..same for timeline...now we are defining this functionality */}
                <div className="tab-pane fade show active" id='home' role='tabpanel' aria-labelledby='home-tab'>
                    {/* again making grid to display the items of about and timeline */}
                    <div className="row">
                      {/* for topics */}
                      <div className="col-md-6">
                        <label>User Id</label>
                      </div>
                      {/* for values of the topics */}
                      <div className="col-md-6">
                        <p>{user._id}</p>
                      </div>
                    </div>

                    {/* now copy paste the row for some more elements */}

                    <div className="row mt-3">
                      {/* for topics */}
                      <div className="col-md-6">
                        <label>Name</label>
                      </div>
                      {/* for values of the topics */}
                      <div className="col-md-6">
                        <p>{user.name}</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      {/* for topics */}
                      <div className="col-md-6">
                        <label>USER ID</label>
                      </div>
                      {/* for values of the topics */}
                      <div className="col-md-6">
                        <p>{user._id}</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      {/* for topics */}
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      {/* for values of the topics */}
                      <div className="col-md-6">
                        <p>{user.email}</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      {/* for topics */}
                      <div className="col-md-6">
                        <label>Phone</label>
                      </div>
                      {/* for values of the topics */}
                      <div className="col-md-6">
                        <p>{user.phone}</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      {/* for topics */}
                      <div className="col-md-6">
                        <label>Profession</label>
                      </div>
                      {/* for values of the topics */}
                      <div className="col-md-6">
                        <p>{user.profession}</p>
                      </div>
                    </div>
                </div>

                {/* now for the timeline tab */}
                <div className="tab-pane fade active" id='profile' role='tabpanel' aria-labelledby='profile-tab'>
                    {/* again making grid to display the items of timeline */}
                    <div className="row">
                      {/* for topics */}
                      <div className="col-md-6">
                        <label>Experience</label>
                      </div>
                      {/* for values of the topics */}
                      <div className="col-md-6">
                        <p>{user.experience}</p>
                      </div>
                    </div>

                    {/* now copy paste the row for some more elements */}

                    <div className="row mt-3">
                      {/* for topics */}
                      <div className="col-md-6">
                        <label>Languages</label>
                      </div>
                      {/* for values of the topics */}
                      <div className="col-md-6">
                        <p>{user.language}</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      {/* for topics */}
                      <div className="col-md-6">
                        <label>Total Projects</label>
                      </div>
                      {/* for values of the topics */}
                      <div className="col-md-6">
                        <p>{user.project}</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      {/* for topics */}
                      <div className="col-md-6">
                        <label>Country/State</label>
                      </div>
                      {/* for values of the topics */}
                      <div className="col-md-6">
                        <p>{user.country}</p>
                      </div>
                    </div>

                </div>

              </div>
            </div>


          </div>
        </form>
      </div>
    </>
  )
}

export default About