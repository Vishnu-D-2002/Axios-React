import React from 'react';

function ReadData({ allData }) {
  return (
    <div>
      {allData.map(user => (
          <div key={user.id} className='card m-4 p-4'><div className='card-title'>Name: {user.name}</div>
              <div className='card-title'>User Name: {user.username}</div>
              <div className='card-title'>Email:{user.email}</div>
              <div>Phone: { user.phone}</div>
          </div>
      ))}
    </div>
  );
}

export default ReadData;
