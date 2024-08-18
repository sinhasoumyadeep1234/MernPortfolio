import React from 'react'
import { useEffect, useContext } from 'react'
import {useNavigate} from 'react-router-dom';
import {userContext} from "../App";

const Logout = () => {

    // define use context(all these is to toggle the login/logout buttons in the navbar component)
    const {state,dispatch} = useContext(userContext);


    const history=useNavigate();
    // now we will do using promises
    useEffect(()=>{
        // fetch the logout route
        fetch('https://mern-portfolio-server-eight.vercel.app/logout',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type": "application/json"
            },
            credentials:"include"
        }).then((response)=>{
            // if response comes it means that coookie got deleted hence naviagate user back to login page..replace true indicates that we truly(pakka) want tho naviagate to the login page
            
            // call dispatcher to make the state false
            dispatch({type:"USER",payload:false});
            
            history("/login",{replace:true});
            // if response is not 200 then error
            if(response.status != 200){
                // throw error
                const error=new Error(response.error);
                throw error;
            }
        }).catch((err)=>{
            console.log(err);
        })
    });
  return (
    <div></div>
  )
}

export default Logout
