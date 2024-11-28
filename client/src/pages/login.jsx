import {useState} from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { alertTitleClasses } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
const [userId, setUserId]= useState('') 
const [userPassword, setUserPassword]= useState('') 

const submitBtn =async ()=>{
    console.log('userId', userId)
    console.log('userPassword', userPassword)
    if(!userId.trim()){
        toast.error("Enter your ID")
    }
    else if(!userPassword.trim()){
        toast.error("Enter your Password")
    }
    
    try{

        let response=await axios.post('http://localhost:4000/login', {userId:userId, userPassword:userPassword})
        console.log('response: ', response);
        if(response.data.success==true){
            toast.success(response.data.message)
        }
        else if(response.data.success==false){
            toast.error(response.data.message)
        }

    }
    catch(error){
        console.log('Error:', error)
        toast.error(error.response.data.message)
    }
    
}



    return(
        <>
            <h4>Login</h4>
            <input type="text" placeholder="Enter Id" value={userId} onChange={(e) => setUserId(e.target.value)}/>
            <input type="password" placeholder="Enter Password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/> 
            <div>
                <button onClick={submitBtn}>Submit</button>
            </div>    
            {/* Toast Container */}
            <ToastContainer />
        </>
    )
    
}

export default Login;