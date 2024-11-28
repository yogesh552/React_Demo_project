import {useState} from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

const Login = () => {
const [userId, setUserId]= useState('') 
const [userPassword, setUserPassword]= useState('') 

const submitBtn =()=>{
    console.log('userId', userId)
    console.log('userPassword', userPassword)
    axios.post('http://localhost:4000/login', {userId:userId, userPassword:userPassword})
}



    return(
        <>
        <h4>Login</h4>
            <input type="text" placeholder="Enter Id" value={userId} onChange={(e) => setUserId(e.target.value)}/>
            <input type="password" placeholder="Enter Password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/> 
            <div>
                <button onClick={submitBtn}>Submit</button>
            </div>    
        </>
    )
    
}

export default Login;