import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Requests = () => {
     const dispatch = useDispatch();
     const requests = useSelector((store)=>store.requests)

  const reviewRequest = async(status,_id)=>{
    try {
      const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},
        { withCredentials:true,})
        dispatch(removeRequest(_id))
    } catch (err) {
      
    }
  }

  const fetchRequests =async()=>{
    try {
       const res = await axios.get(BASE_URL+"/user/requests/recieved",{
        withCredentials:true,
       })   
      dispatch(addRequests(res.data.data)) ;
    } catch (err) {
      
    }
  }

  useEffect(()=>{
    fetchRequests();
  },[])
  
  if (!requests)return;
  if (requests===0)return <h1>No Requests Found</h1>


  return (
    <div className='flex justify-center my-10'>
      <h1 className='text-bold text-2xl'>Requests</h1>
      {requests.map((request)=>{
        const {_id,firstName,lastName,photoUrl,age,gender,about}=request.fromUserId;

        return(
        <div key ={_id} className='m-4 p-4 bg-base-200 rounded-1g'>
          <div>
            <img className ="w-20 h-20"alt="photo" src = {photoUrl}/>
          </div>
          <div>
            <h2>{firstName+" "+lastName}</h2>
            <p>{about}</p>
            <div>
               <button className="btn btn-primary mx-2"
               onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
               <button className="btn btn-secondary mx-2"
               onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
            </div>

          </div> 
        </div>  
          
      )})}
      
    </div>
  )
}

export default Requests
