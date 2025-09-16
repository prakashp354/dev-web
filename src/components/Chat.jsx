import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
    const {targetUserId} = useParams();
    const [message,setMessage]=useState([]);
    const [newMessage,setNewMessage] = useState("");
    const user = useSelector(store =>store.user);
    const userId = user?._id;

    const fetchChatMessages = async ()=>{
       const chat = await axios.get(BASE_URL+ "/chat/" + targetUserId,{
        withCredentials:true,
       });
       console.log(chat.data.messages); 
       
       const chatMessages = chat?.data?.messages.map((msg)=>{
        const {senderId,text} = msg;
          return {
            firstName:senderId?.firstName,
            lastName:senderId?.lastName,
            text,
          };
       });
       setMessage(chatMessages)
    };
    useEffect(()=>{
      fetchChatMessages();
    },[]);


    useEffect(()=>{
        if(!userId){return};

        const socket = createSocketConnection();
        socket.emit("joinChat",{firstName:user.firstName,userId,targetUserId});

        socket.on("messageRecieved",({firstName,lastName,text})=>{
          console.log(firstName + " : " + text);
          setMessage((message)=>[...message,{firstName,lastName,text}])
        }) 

        return ()=>{
            socket.disconnect();
        };
    },[userId,targetUserId]);

    const sendMessage = ()=>{
      const socket = createSocketConnection();
      socket.emit ("sendMessage",{
        firstName:user.firstName,
        lastName:user.lastName,
        userId,targetUserId,
         text:newMessage});
      setNewMessage("");
    }

  return (
    <div className='w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col'>
      <h1>Chat</h1>
      <div className='flex-1 overflow-scroll p-5'>{
        message.map((msg,index)=>{
            return(
             <div key ={index} 
             className={`chat ${user.firstName === msg.firstName ? "chat-end" : "chat-start"}`}>
              <div className='chat-header'>
              {`${msg.firstName}  ${msg.lastName}`}
              </div>
              <div className='chat-bubble'>{msg.text}</div>  
             </div>   
            )
        })}</div>
      <div className='p-s border-t border-gray-600 flex items-center gap-2'>
        <input 
        value={newMessage}
        onChange={(e)=>setNewMessage(e.target.value)}
        className='flex-2 border border-gray-400 text-black rounded p-2'></input>
        <button onClick={sendMessage} className='btn btn-primary'>send</button>
      </div>
    </div>
  )
}

export default Chat
