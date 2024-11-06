import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import './home.css'

import Cookies from "js-cookie";

const Home =()=>{
let navigate = useNavigate();
    useEffect(()=>{
        let token = Cookies.get('jwtToken')
        if(token === undefined){
            navigate('/auth')
        }
    })
    const onJobs = ()=>{
        navigate('/jobs')
    }
    return(
        <>
        <Header/>
        <div className="container-fluid cont8">
            <div className="row">
                <div className="col-md-6 text-center text-light mt-5">
                    <div  className="mt-5">

                        <h1>Find the Job That Fits Your Life </h1>

                    </div >
                    <div className="mt-5">
                        <b>Millions of people are searching for jobs,salary,information,company reviews.Find the job that fits  your abilities and potentials</b>
                    </div>
                    <div className="mt-5">
                        <button className="btn log_btn1" onClick={onJobs}>Find jobs</button>
                    </div>
                </div>
            </div>
        </div>

        
        </>
    )
}

export default Home;