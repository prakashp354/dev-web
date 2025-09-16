import React from 'react'

const Premium = () => {
  return (
    <div className='m-10'>
      <div className="flex w-full ">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
            <h1 className='font-bold text-3xl'>Silver MemberShip</h1>
            <ul>
                <li>-blue tick</li>
                <li>-100 connections per day</li>
                <li>-faster connections</li>
                <li>-6 months</li>      
                </ul>
                <button className='btn btn-primary'>Buy Silver</button>
            </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
            <h1 className='font-bold text-3xl'>Gold MemberShip</h1>
            <ul>
                <li>-blue tick</li>
                <li>-unlimited connections per day</li>
                <li>-faster connections</li>
                <li>-you can retieve the ignored connections</li>
                <li>-12 months</li>
                </ul>
                <button className='btn btn-secondary'>Buy Gold</button>
            </div>
      </div>
    </div>
  )
}

export default Premium
