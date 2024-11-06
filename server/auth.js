const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const jobbyUsersData = require('./jobbyuserdata')

const jwt = require('jsonwebtoken')
const jwtAuth = require('./middleware')
const {Jobs,JobDetails} = require('./jobs')



router.get('/',(req,res)=>{
    res.send('auth file')
})

router.post('/signup',async(req,res)=>{
   try{
    const {name,email,phoneNumber,gender,password} = req.body;
    const userExist = await jobbyUsersData.findOne({email:email});

    console.log(req.body);

    if(!userExist){
        const maskedPass = await bcrypt.hash(password,10);
        const user = new jobbyUsersData ({
            name:name,
            email:email,
            phoneNumber:phoneNumber,
            gender:gender,
            password:maskedPass
        })

        user.save();
        return res.status(201).json({message:'register success'})

    }else{
        return res.status(401).json({message:'user already registered'})
    }
  

   }catch(e){
    console.log(e, 'signup')
   }

})



router.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body;

        const userFound = await jobbyUsersData.findOne({email:email})

        if(userFound){
           const matchPassword = await bcrypt.compare(password,userFound.password)

           if(matchPassword){

            let  payLoad = {
                id:userFound._id
            }

            let token = jwt.sign(payLoad,'KEY',{expiresIn:'24hr'})
            return res.status(200).json({token:token,message:'login success'})
           }else{
            return res.status(400).json({message:'password not matched'})
           }
        }else{
            return res.status(400).json({message:'user not found'})
        }

    }catch(e){
        return res.status(500).json({message:'error'})
    }
})


// profile

router.get('/profile',jwtAuth,async(req,res)=>{
    
    try{
        const userd = await jobbyUsersData.findOne({_id:req.id})
        return res.json({profile:userd})

    }catch(e){
        return res.json({message:'error'})
    }
})


// sending data to db 

const addJobs = async () => {
  try {
    const jobDetail = new JobDetails({
      title:"Data Scientist",
      rating:5,
      companyLogoUrl:"https://assets.ccbp.in/frontend/react-js/jobby-app/google-img.png",
      location:"Chennai",
      jobDescription:"As a Data Scientist, you will evaluate and improve Google's products. You'll collaborate with a multi-disciplinary team of Engineers and Analysts on a wide range of problems, bringing analytical rigor and statistical methods to the challenges of measuring quality, improving consumer products, and understanding the behavior of end-users.",
      employmentType:"Freelance",
      packagePerAnnum:"12 LPA",
      skills: [
        {
            name: "HTML 5",
            imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/html-img.png"
            },
            {
            name: "CSS 3",
            imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/css-img.png"
            },
            {
            name: "Javascript",
            imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/javascript-img.png"
            },
            {
            name: "React JS",
            imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/reactjs-img.png"
            },
            {
            name: "Redux",
            imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/redux-img.png"
        }
      ],

      lifeAtCompany: {
        description: "Our core philosophy is people over process. Our culture has been instrumental to our success. It has helped us attract and retain stunning colleagues, making work here more satisfying. Entertainment, like friendship, is a fundamental human need, and it changes how we feel and gives us common ground. We want to entertain the world.",
        imageUrl:  "https://assets.ccbp.in/frontend/react-js/jobby-app/life-facebook-img.png"
      },
      
    });

    const savedJobDetail = await jobDetail.save();
    // Create and save a Job document that uses the same _id as the JobDetail

    const job = new Jobs({
      _id: savedJobDetail._id, // Use the same _id as the JobDetail
      title: savedJobDetail.title,
      companyLogoUrl: savedJobDetail.companyLogoUrl,
      rating: savedJobDetail.rating,
      location: savedJobDetail.location,
      packagePerAnnum: savedJobDetail.packagePerAnnum,
      jobDescription:savedJobDetail.jobDescription,
      employmentType: savedJobDetail.employmentType,
    });


    await job.save();
    await mongoose.disconnect();
  } catch (e) {
    console.log(e);
  }
};

// addJobs()

module.exports = router;