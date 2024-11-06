const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')

const port = 4002 || process.env.PORT;

const app = express()


app.use(express.json())
app.use(cors());


mongoose.connect("mongodb+srv://msrinivasreddy5454:Srinivas9189@cluster0.tz1obml.mongodb.net/jobbyapp?retryWrites=true&w=majority")
.then(()=>console.log('DB Connected'))
.catch((error)=>console.log('DB not connected'))


app.get('/',(req,res)=>{
    res.send('hello')
})

app.use('/auth',require('./auth'))
app.use('/api',require('./api'))

app.listen(port,()=>{
    console.log(`server${port}`)
})