import React from 'react'
import EdirProfile from './EditProfile'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector((store)=>store.user)
  return (
    user&&(
    <div>
      <EdirProfile user={user}/>
    </div>
    ) 
  )
}

export default Profile
