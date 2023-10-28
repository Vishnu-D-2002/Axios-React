import React, { useState } from 'react';

function EditUser({ allData, setAllData }) {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({ name: '', username: '', email: '', phone: '' });

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditedUser({
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    const updatedData = allData.map((user) => {
      if (user.id === editingUserId) {
        return { ...user, ...editedUser };
      }
      return user;
    });

    setAllData(updatedData);

    setEditingUserId(null);
    setEditedUser({ name: '', username: '', email: '', phone: '' });
  };

  return (
    <div>
      <div className="row justify-content-center">
      {allData.map((user) => (
        <div key={user.id} className='card col-12 col-md-4 col-lg-2 m-4 p-4 ' id='card'>
            {editingUserId === user.id ? (
              <div>
                <label>Name:</label>
                <input
                  type='text'
                  name='name'
                  value={editedUser.name}
                  onChange={handleChange}
                  className='form-control'
                />
                <label>User Name:</label>
                <input
                  type='text'
                  name='username'
                  value={editedUser.username}
                  onChange={handleChange}
                  className='form-control' 
                />
                <label>Email:</label>
                <input
                  type='text'
                  name='email'
                  value={editedUser.email}
                  onChange={handleChange}
                  className='form-control' 
                />
                <label>Phone:</label>
                <input
                  type='text'
                  name='phone'
                  value={editedUser.phone}
                  onChange={handleChange}
                  className='form-control' 
                />
                <button className='btn btn-primary m-4' onClick={handleSave}>
                  Save
                </button>
              </div>
            ) : (
              <div>
                <div className='card-title'><strong>Name: </strong>{user.name}</div>
                <div className='card-title'><strong>User Name: </strong>{user.username}</div>
                <div className='card-title'><strong>Email: </strong>{user.email}</div>
                <div><strong>Phone: </strong>{user.phone}</div>
                <button className='btn btn-success m-4 ' onClick={() => handleEdit(user)}>
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditUser;
