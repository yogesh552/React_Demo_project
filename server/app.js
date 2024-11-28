const express=require('express');
const app=express()
const dotenv=require('dotenv');
const cors=require('cors')
dotenv.config({path:'./config.env'})
const bodyParser = require('body-parser');

const corsOptions = {
    origin: ['http://localhost:5173'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  };
app.use(cors(corsOptions));
  
app.set('view engine','ejs')
app.use('/public',express.static("public"))

app.use(bodyParser.json());

app.use('/',require('./routes/route.js'))
app.listen(process.env.PORT,()=>{
    console.log(`Port is running on ${process.env.PORT}`)
})