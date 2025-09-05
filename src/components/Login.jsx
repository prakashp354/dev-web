import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';


const Login = () => {
    const [emailId,setEmailId]=useState("ramanjali123@gmail.com");
    const [password,setPassword]=useState("Ramanjali@123456");
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [isLoginForm,setIsLoginForm]=useState(false)
    const [error,setError]= useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async()=>{
        try {
          const res = await axios.post(
            BASE_URL+"/login",{
            emailId,
            password,
          } ,{withCredentials:true});
          dispatch(addUser(res.data));
          return navigate("/");
        } catch (err) {
          setError(err?.response?.data.error || "something went wrong") 
        }
    }
    
    const handleSignUp = async()=>{
      try {
        const res = await axios.post(
          BASE_URL + "/signup",{firstName,lastName,emailId,password},{withCredentials:true}
        );
        dispatch(addUser(res.data.data));
        return navigate("/profile");
      } catch (err) {
        setError(err?.response?.data.error || "something went wrong")  
      }
    }
  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center">{isLoginForm ? "Login":"Sign Up"}</h2>
    <div>
{!isLoginForm&&(
  <>
  <fieldset className="fieldset">
  <legend className="fieldset-legend my-3">First Name{}</legend>
  <input type="text" 
  value={firstName} 
  className="input" 
  onChange={(e)=>setFirstName(e.target.value)}  /> 
</fieldset> 
<fieldset className="fieldset">
  <legend className="fieldset-legend my-3">Last Name {}</legend>
  <input type="text" 
  value={lastName} 
  className="input" 
  onChange={(e)=>setLastName(e.target.value)}  /> 
</fieldset>
</>
) }
<fieldset className="fieldset">
  <legend className="fieldset-legend my-3">Email ID:{}</legend>
  <input type="text" 
  value={emailId} 
  className="input" 
  onChange={(e)=>setEmailId(e.target.value)}  /> 
</fieldset>  
    </div>
    <div>
<fieldset className="fieldset">
  <legend className="fieldset-legend my-3">Password:{}</legend>
  <input type="text"
   value={password}
    className="input" 
    onChange={(e)=>setPassword(e.target.value)} />
</fieldset>
    </div>
     <p className ="text-red-700">{error}</p>
    <div className="card-actions justify-center">
     
      <button className="btn btn-primary"onClick = {isLoginForm? handleLogin: handleSignUp}>
        {isLoginForm ? "Login" : "Sign Up"}
        </button>
    </div>
    <p className='m-auto cursor-pointer'
     onClick={()=>setIsLoginForm((value) =>!value)}>
      {isLoginForm ? "New User? Sign Up Here"
      :"Existing User? Login Here"}
     </p>
  </div>
</div>
    </div>
  )
}

export default Login ;
