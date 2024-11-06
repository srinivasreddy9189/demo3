const mongoose = require('mongoose');


const skills = new mongoose.Schema({
    name:String,
    imageUrl:String
})

const lifeAtCompany = new mongoose.Schema({
    description:String,
    imageUrl:String
})

const jobs = new mongoose.Schema({
    title:String,
    companyLogoUrl:String,
    rating:String,
    location:String,
    packagePerAnnum:String,
    jobDescription:String,
    employmentType:String
})

const Jobs = mongoose.model('Jobs',jobs);

const jobsDetails = new mongoose.Schema({
    title:String,
    companyLogoUrl:String,
    companyWebsiteUrl:String,
    rating:String,
    location:String,
    packagePerAnnum:String,
    jobDescription:String,
    employmentType:String,
    skills:[skills],
    lifeAtCompany:lifeAtCompany
})

const JobDetails = mongoose.model('JobDetails',jobsDetails)


module.exports = {Jobs,JobDetails}
