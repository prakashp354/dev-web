import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
   const dispatch = useDispatch();
   const connections = useSelector((store)=>store.connections); 
  const fetchConnections = async ()=>{

    try {
        const res = await axios.get(BASE_URL+"/user/connections",{
            withCredentials:true,
        });
        dispatch(addConnections(res.data.data))
    } catch (err) {
         
    }
  };
    
  useEffect(()=>{
    fetchConnections();
  },[]);

  if (!connections)return;
  if (connections===0)return <h1>No Connection Found</h1>  


  return (
    <div className='flex justify-center my-10'>
      <h1 className='text-bold text-2xl'>Connections</h1>
      {connections.map((connection)=>{
        const {_id,firstName,lastName,photoUrl,age,gender,about}=connection;

        return(
        <div key ={_id} className='m-4 p-4 bg-base-200 rounded-1g'>
          <div>
            <img className ="w-20 h-20"alt="photo" src = {photoUrl}/>
          </div>
          <div>
            <h2>{firstName+" "+lastName}</h2>
            <p>{about}</p>
          </div> 
        </div>  
          
      )})}
      
    </div>
  )
}

export default Connections
