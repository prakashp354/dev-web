import React, { useState } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showtoast,setShowtoast] = useState(false)

  const saveProfile = async () => {
    setError("")
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !Number(age) ||
      !gender.trim() ||
      !about.trim() ||
      !photoUrl.trim()
    ) {
      setError("All fields are required.");
      return; // Prevent sending invalid profile update
    }
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl: photoUrl.replace(/^http:/, "https:"), // Ensure https
          age: Number(age),
          gender,
          about
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data))  // Be sure addUser is imported if you use this line!
      setShowtoast(true);
      setTimeout(()=>{
         setShowtoast(false)
      },5000)
    } catch (err) {
      setError(err.response.data );
    }
  };

  return (
  <>
     {showtoast&&(
      <div className="toast toast-top toast-center">
        <div className="alert alert-success">
           <span>Profile Saved Successfully.</span>
        </div>
     </div>
     )}
    <div className="flex flex-row justify-center items-start space-x-8 mt-10 w-full">
      <div className="flex justify-center my-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile </h2>
            <fieldset>
              <legend>First Name</legend>
              <input type="text" value={firstName} className="input" onChange={e => setFirstName(e.target.value)} />
            </fieldset>
            <fieldset>
              <legend>Last Name</legend>
              <input type="text" value={lastName} className="input" onChange={e => setLastName(e.target.value)} />
            </fieldset>
            <fieldset>
              <legend>Photo Url</legend>
              <input type="text" value={photoUrl} className="input" onChange={e => setPhotoUrl(e.target.value)} />
            </fieldset>
            <fieldset>
              <legend>Age</legend>
              <input type="text" value={age} className="input" onChange={e => setAge(e.target.value)} />
            </fieldset>

           <fieldset>
         <legend>Gender</legend>
            <select 
          className="input" 
           value={gender} 
           onChange={e => setGender(e.target.value)}>
           <option value="" disabled>Select gender</option>
           <option value="male">Male</option>
           <option value="female">Female</option>
          <option value="others">Others</option>
            </select>
            </fieldset>
  
            <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <textarea className="textarea h-24" type="text" value={about}  onChange={e => setAbout(e.target.value)}></textarea>
            </fieldset>
            <p className="text-red-700">{error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-start pt-10 my-10 bg-base-300 rounded-lg">
        <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
      </div>
    </div>
  </>
  );
};

export default EditProfile;
