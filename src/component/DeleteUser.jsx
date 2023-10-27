import axios from 'axios'
import React from 'react'

function DeleteUser({ allData,setAllData }) {
     
  const  handleDelete = async(userid) => {
      try {
          const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${userid}`)
          setAllData(allData.filter(user=>user.id!=userid))
      } catch (error) {
          console.log(error)
      }
  }
  return (
    <div> <div>
    {allData.map(user => (
        <div key={user.id} className='card m-4 p-4'><div className='card-title'>Name: {user.name}</div>
            <div className='card-title'>User Name: {user.username}</div>
            <div className='card-title'>Email:{user.email}</div>
            <div>Phone: {user.phone}</div>
            <button className='m-4' onClick={()=>handleDelete(user.id)}>Delete</button>
        </div>
    ))}      
  </div></div>
  )
}

export default DeleteUser
