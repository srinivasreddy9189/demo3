import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Header from "./header";
import './job.css'
import JobProfile from "./jobprofile";



const Jobs = ()=>{
    let navigate = useNavigate();
useEffect(()=>{
let token = Cookies.get('jwtToken');
if(token === undefined){
    navigate('/auth')
}
})

    return(
        <>
        <Header/>
        <div>
            <JobProfile/>
        </div>

        </>
    );

}

export default Jobs;