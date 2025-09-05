import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => { 
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  }; 

  useEffect(() => {
    getFeed(); 
  }, []);
  if (feed === null) return null;
  if (feed.length === 0) {return <h2 className='flex justify-center my-10'>No New Users Found ! </h2>} ;

 

  return (
    
      <div className='flex justify-center my-10'>
      <UserCard user = {feed[0]} />
      </div>
    
  );
};

export default Feed;
