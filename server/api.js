const express = require('express');
const router = express.Router();

const jwtAuth = require('./middleware');
const { Jobs, JobDetails } = require('./jobs');


router.get('/',(req,res)=>{
    res.send('auth file')
})
// all jobs 

router.get('/jobs',jwtAuth,async(req,res)=>{
    try{
        const {search,employment_type,minimun_package} = req.query;
        
        const query = {}
        if(employment_type){
            const employmentArray = employment_type.split(',');
            query.employmentType = {$in:employmentArray.map(type => new RegExp(type,'i'))};
        }
        if(minimun_package){
            const miniPackValue =  parseFloat(minimun_package.replace(/\D+/g,''));

            if(!isNaN(miniPackValue)){
                query.packagePerAnnum ={$gte:miniPackValue};
            }
        }
        if(search){
            query.title = {$regex:search,$options:'i'};
        }

        const filteredJobs = await Jobs.find(query);

        if(filteredJobs===0){
            return res.json('no jobs found')
        }
        else{
            return res.json({jobs:filteredJobs})
        }

    }catch(e){
        console.log(e,'jobs api')

        return res.status(500).json({message:'internal server error'})

    }
})


router.get('/jobdetails/:jobId',jwtAuth,async(req,res)=>{
    try{

        const {jobId} = req.params;
        const jobDetails = await JobDetails.findOne({_id:jobId})
       if(!jobDetails){
        return res.status(400).json({message:'no jobs found'})
       }

       const jobTitle = jobDetails.title;

       const similarJobs = await Jobs.find({
        title:{$regex:jobTitle,$options:'i'},
        _id:{$ne:jobId}
       })
res.status(200).json({jobDetails:jobDetails,similarJobs:similarJobs})
    }catch(e){
        console.log(e,'job details api');

        return res.status(500).json({message:'server error'})
    }
})


module.exports = router;