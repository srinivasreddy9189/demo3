import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import './profilesection.css';
import { CgProfile } from "react-icons/cg";

const apiStatusConstant ={
    intial:"INTIAL",
    progress:"PROGRESS",
    success:"SUCCESS",
    failure:"FAILURE"

}




const ProfileSection = ()=>{
    const [profileList,setProfileList] = useState({})
    const[apiStatus,setApiStatus]= useState(apiStatusConstant.intial)

    useEffect(()=>{
getProfile();
    },[])

    const getProfile =async()=>{
        setApiStatus(apiStatusConstant.progress)

        const token = Cookies.get('jwtToken');

        const url2= 'http://localhost:4002/auth/profile'

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
                setProfileList(data.profile);
                console.log(profileList)
                setApiStatus(apiStatusConstant.success)
            }

        }catch{
            setApiStatus(apiStatusConstant.failure)
        }

    
    }

 
    return(
        <>
        <div className="box13 ml-5 mt-5">



            <div className="box14 text-center">
                <CgProfile style={{fontSize:'50px'}}/>
                <h3 className="profilename"><b>{profileList.name}</b></h3>
                <p className="profilename mt-2">Full stack developer</p>
            </div>
            

        </div>
        <div>
               
                
            </div>
        </>
    );
}

export default ProfileSection;