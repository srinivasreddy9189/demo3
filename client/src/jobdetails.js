import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import { FaStar,FaSuitcase } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineArrowOutward } from "react-icons/md";
import './jobdetails.css'
import Header from "./header";
const apiStatusConstant ={
    intial:"INTIAL",
    progress:"PROGRESS",
    success:"SUCCESS",
    failure:"FAILURE"

}



const JobDeailsId = ()=>{
    const[apiStatus,setApiStatus]= useState(apiStatusConstant.intial);

    const [jobDetails,setJobDetails] = useState({});
    const [similarJobs,setSimilarJobs] = useState([])
    const [skillsList,setSkillsList] = useState([])
    const [lifeList,setLifeList] = useState([])

    


    
    let navigate = useNavigate();

    let params = useParams();

    const {jobId} = params;

    useEffect(()=>{
        let token = Cookies.get('jwtToken');
        if(token === undefined){
            navigate('/auth')
        }
        getJobDetails();
        
    },[])

    const getJobDetails = async()=>{
        setApiStatus(apiStatusConstant.progress);
const token = Cookies.get('jwtToken')
        const url3 = `http://localhost:4002/api/jobdetails/${jobId}`

        const options = {
            headers:{
                Authorization: `Bearer ${token}`
            },
            method:'GET'
        }
        const response = await fetch(url3,options);
       
        if(response.ok === true){
            
            const data = await response.json();
            setJobDetails(data.jobDetails);

            setSimilarJobs(data.similarJobs)
            setSkillsList(data.jobDetails.skills)
            setLifeList(data.jobDetails.lifeAtCompany)
            // console.log(data)
            setApiStatus(apiStatusConstant.success)
        }else{
            setApiStatus(apiStatusConstant.failure)
        }

    }
    const renderFailView =()=>{
        return(
            <div className="container-fluid">
                <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png "/>

                <h1>Oops something went wrong</h1>
                <p>we Cannot find the page you are looking for</p>
            </div>
        );
    }

    const renderLoader = ()=>{
        return(
            <div className="container cont11">
                <ThreeDots
  height="80"
  width="80"
  radius="9"
  color="yellow"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>
            </div>
        );
    }

    const renderJobDetails = ()=>{
        return(
            <div className="container-fluid cont13 pt-5">
            <div className="container text-light box11">
            <div>
                <div>
                            <div className="d-flex">
                                <div>
                                    <img className="img_logo mt-3" src={jobDetails.companyLogoUrl}/>
                                </div>
                                <div className="ml-5 mt-3">
                                   
                                    <b>{jobDetails.title}</b>
                                    <div className="nt-3">
                                        <FaStar className="mr-2" style={{color:'yellow'}}/>
                                        <b>{jobDetails.rating}</b>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                        <div className="d-flex">
                            <div className="ml-2">
                                 <FaLocationDot className="mr-2"/>
                                 <b className="mr-3">{jobDetails.location}</b>
                            </div>
                            <div>
                                <FaSuitcase className="mr-2"/>
                                <b className="mr-3">{jobDetails.employmentType}</b>

                            </div>
                        </div>
                        <div>
                            <b>{jobDetails.packagePerAnnum}</b>
                        </div>
                        </div>
                        <div className="hr mt-3"></div>
                        <div className="mt-3 mb-5">
                            <div className="d-flex justify-content-between">
                            <p>Description</p>
                            <a href="https://youtu.be/lMdRUdHUYTo?feature=shared" target="_blank">Visit<MdOutlineArrowOutward className="mb-1"/></a>
                            </div>
                            <p className="mb-5">{jobDetails.jobDescription}</p>
                            <p className="wid"></p>
                            
                        </div>
                        <h3 className="mb-3"><b>Skills</b></h3>
                        <div className="row">
                            {skillsList.map((each2)=>
                           
                            <div className="col-sm-2 ml-4">
                                <div className="d-flex">
                                    
                                    <img src={each2.imageUrl}/>
                                    <b className="mt-3">{each2.name}</b>
                                </div>
                            </div>
                            
                        )}

                        </div>
                        <div className="container mt-3 mb-5 cont16">
                            <h3><b>Life at company</b></h3>
                            <div className="row">
                                <div className="col-md-8">
                                    <p className="mt-3">{lifeList.description}</p>
                                </div>
                                <div className="col-md-4">
                                    <img src={lifeList.imageUrl}/>
                                </div>
                            </div>
                        </div>

                        </div>

            </div>
        <div className="container">
            <h3 className="text-light"><b>Similar jobs</b></h3>
            <div className="row">
            
            {similarJobs.map((each)=>
           <div className="col-md-4 mt-3">
             <div className=" box1 text-light">
                            <div className="d-flex m-2">
                                <div>
                                    <img className="img_logo mt-3" src={each.companyLogoUrl}/>
                                </div>
                                <div className="ml-2 mt-3">
                                    <b>{each.title}</b>
                                    <div className="mt-2">
                                        <FaStar className="mr-2" style={{color:'yellow'}}/>
                                        <b>{each.rating}</b>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3  m-2 ">
                            <p>Description</p>
                            <p className=" box2">{each.jobDescription}</p>
                           
                            
                        </div>
                        <div className="d-flex">
                            <div className="ml-2">
                                 <FaLocationDot className="mr-2"/>
                                 <b className="mr-3">{each.location}</b>
                            </div>
                            <div>
                                <FaSuitcase className="mr-2"/>
                                <b className="mr-3">{each.employmentType}</b>

                            </div>
                        </div>
                            
                        </div>
           </div>
           
           )}

            </div>

     
            
        </div>
        
        

        </div>
        )
    }


    const allDetails = ()=>{
        switch(apiStatus){
            case apiStatusConstant.success:
            return renderJobDetails() ;
            case apiStatusConstant.failure:
                return renderFailView();
                case apiStatusConstant.progress:
                    return renderLoader();
                    default:
                        return null;
           }
    }

    


    return(
        <>
        <Header/>
        {renderJobDetails()}
        
        </>
    );
}

export default JobDeailsId;