import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateUser({ allData, setAllData }) {
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    // Clear errors when the user starts typing again
    setErrors({ ...errors, [name]: null });
  };

  const validateForm = () => {
    const newErrors = {};

    // Check for required fields
    if (!newUser.name) {
      newErrors.name = 'Name is required';
    }
    if (!newUser.username) {
      newErrors.username = 'Username is required';
    }
    if (!newUser.email) {
      newErrors.email = 'Email is required';
    }
    if (!newUser.phone) {
      newErrors.phone = 'Phone is required';
    }

    // Check for valid email format
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (newUser.email && !emailPattern.test(newUser.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addnewUser = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(
          'https://jsonplaceholder.typicode.com/users',
          newUser
        );
        setAllData([...allData, response.data]);
        setNewUser({ name: '', username: '', email: '', phone: '' });
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='m-3'>
      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <label>Name:</label>
          <input
            type='text'
            name='name'
            value={newUser.name}
            onChange={handleChange}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          />
          {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
        </div>
        <div className='col-md-6 col-sm-12'>
          <label>User Name:</label>
          <input
            type='text'
            name='username'
            value={newUser.username}
            onChange={handleChange}
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          />
          {errors.username && (
            <div className='invalid-feedback'>{errors.username}</div>
          )}
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={newUser.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
        </div>
        <div className='col-md-6 col-sm-12'>
          <label>Phone:</label>
          <input
            type='tel'
            name='phone'
            value={newUser.phone}
            onChange={handleChange}
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
          />
          {errors.phone && <div className='invalid-feedback'>{errors.phone}</div>}
        </div>
      </div>
      <div className='row'></div>
      <button className='btn btn-primary btn-block m-4' onClick={addnewUser}>
        Add New User
      </button>
    </div>
  );
}

export default CreateUser;
