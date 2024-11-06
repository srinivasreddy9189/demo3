import { useState,useEffect } from "react";
import Cookies from "js-cookie";
import { CiSearch } from "react-icons/ci";
import './jobprofile.css'
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaSuitcase } from "react-icons/fa";
import { ThreeDots } from 'react-loader-spinner'
import { Link } from "react-router-dom";
import ProfileSection from "./profilesection";
import Jobfilters from "./jobfilters";


const apiStatusConstant ={
    intial:"INTIAL",
    progress:"PROGRESS",
    success:"SUCCESS",
    failure:"FAILURE"

}

const employTypeList = [
    {
      label:'Full Time',
      employTypeId:'FULL TIME'
},
{
    label:'Part Time',
    employTypeId:'PART TIME'
},
{
    label:'Freelance',
    employTypeId:'FREELANCE'
},
{
    label:'Internship',
    employTypeId:'INTERNSHIP'
},
]

const salaryRangeList =  [
    {
        salaryRangeId:"1000000",
        label:"10 LPA and Above"
    },
    {
        salaryRangeId:"2000000",
        label:"20 LPA and Above"
    },
    {
        salaryRangeId:"3000000",
        label:"30 LPA and Above"
    },
    {
        salaryRangeId:"4000000",
        label:"40 LPA and Above"
    },
]

const  JobProfile = ()=>{
    const [jobs,setJobs]= useState([]);
    const [searchInput,setSearchInput]= useState('');
    const [employmentType,setEmploymentType] = useState([]);

    const [salaryRange,setSalaryRange] = useState(0);
    const[apiStatus,setApiStatus]= useState(apiStatusConstant.intial)

    useEffect(()=>{
    getJobs();
    
    },[employmentType,salaryRange])

   

    const getJobs = async()=>{

        setApiStatus(apiStatusConstant.progress)

        const token = Cookies.get('jwtToken');

        const url2= `http://localhost:4002/api/jobs?search=${searchInput}&employment_type=${employmentType.join()}&minimun_package=${salaryRange}`

        const options = {

            headers:{
                Authorization: `Bearer ${token}`
            },

           method:'GET'
            
        };
        try{
            const response = await fetch(url2,options)
            

            if(response.ok === true){
                const data = await response.json();
                setJobs(data.jobs);
                setApiStatus(apiStatusConstant.success)
            }

        }catch{
            setApiStatus(apiStatusConstant.failure)
        }

    }
    const onChangeSearch = (e)=>{
        setSearchInput(e.target.value)

    }
    const onChangeSalary = (salary)=>{
        setSalaryRange(salary)
    }
    const onChangeEmployment = (type)=>{

        setEmploymentType((prev)=>[...prev,type]);

    }
    
    const onKeyDown =(e)=>{
        
        if(e.key === 'Enter'){
            getJobs()
        }
    }

    


    const renderJobs = ()=>{
        const jobDisplay = jobs.length >0;
        return  (jobDisplay ?(
            <div className="container mt-5">
                <div className="input1 form-control w-50 d-flex justify-content-between">
                   
                    <input className="inp1 w-100" 
                    type="search" placeholder="search" 
                    onChange={onChangeSearch} 
                    onKeyDown={onkeydown} 
                    value={searchInput}/>
                    

                  <div className="d-flex justify-content-center align-items-center mb-1 searchbox">
                  <button className="but1" onClick={getJobs}><CiSearch/></button>
                  </div>


                </div>
                <div className="mt-5 text-light">
                    {jobs.map((each)=>(
                       <div className="box mt-2">
                        <div className="m-3">
                        <div>
                            <div className="d-flex">
                                <div>
                                    <img className="img_logo mt-3" src={each.companyLogoUrl}/>
                                </div>
                                <div className="ml-5 mt-3">
                                   <Link to= {`/jobs/${each._id}`} className="link">
                                    <b className="link">{each.title}</b></Link>
                                    <div className="nt-3">
                                        <FaStar className="mr-2" style={{color:'yellow'}}/>
                                        <b>{each.rating}</b>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="d-flex justify-content-between mt-3">
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
                        <div>
                            <b>{each.packagePerAnnum}</b>
                        </div>
                        </div>
                        
                        <div className="hr mt-3"></div>
                        <div className="mt-3 mb-5">
                            <p>Description</p>
                            <p className="mb-5">{each.jobDescription}</p>
                            <p className="wid"></p>
                            
                        </div>
                        
                       </div>
                       
                       </div>
                       

                    ))}
                </div>

            </div>
        ):(<div className="container-fluid cont12 mt-5 text-center mb-5 text-light">
        <img className="mt-5" src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "/>
        <h1 className="mt-3"><b>No jobs found</b></h1>
        <p className="mt-3">We could not find any jobs.Try other filters</p>
    </div>)

        )
    }

    const renderFailView =()=>{
        setApiStatus(apiStatusConstant.failure)
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

    const renderJobsSection = ()=>{
       switch(apiStatus){
        case apiStatusConstant.success:
        return renderJobs();
        case apiStatusConstant.failure:
            return renderFailView();
            case apiStatusConstant.progress:
                return renderLoader();
                default:
                    return null;
       }
    }




console.log(apiStatus)
    console.log(jobs)
    return(
<div className="container-fluid black_cont">
    <div className="row">
        <div className="col-md-4 col_fixed">

            <ProfileSection />

            <Jobfilters
             employTypeList={employTypeList}

             salaryRangeList={salaryRangeList}
             changeEmployType={onChangeEmployment}
             changeSalaryRange={onChangeSalary}
             getJobs={getJobs}
            
            />
            

        </div>
        <div className="col-md-8 col_scroll">
            
            {renderJobsSection()}

        </div>
    </div>

</div>
    );
}

export default JobProfile

