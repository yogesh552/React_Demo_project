const mysql=require("mysql");
const dotenv=require('dotenv');
dotenv.config({path:'../config.env'})

const connection=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORDs,
    database:process.env.DB_NAME 
})

connection.connect(function(err){
    if(err) throw err;
    console.log("database successfully connected")
    // console.log("database successfully connected",connection.threadId)
})

module.exports=connection
