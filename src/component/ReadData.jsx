import React from 'react';

function ReadData({ allData }) {
  return (
    <div className="row justify-content-center">
      {allData.map((user) => (
        <div
          key={user.id}
          id="card"
          className="card col-12 col-md-4 col-lg-2 m-2 p-4 mx-5 my-2"
        >
          <div className="card-title">
            <span>
              <strong>Name: </strong>
            </span>
            {user.name}
          </div>
          <div className="card-title">
            <span>
              <strong>User Name: </strong>
            </span>
            {user.username}
          </div>
          <div className="card-title">
            <span>
              <strong>Email: </strong>
            </span>
            {user.email}
          </div>
          <div>
            <span>
              <strong>Phone: </strong>
            </span>{" "}
            {user.phone}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReadData;
