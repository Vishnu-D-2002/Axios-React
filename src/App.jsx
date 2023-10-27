import React, { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes, useParams } from 'react-router-dom';
import axios from 'axios';

import ReadData from './component/ReadData';
import CreateUser from './component/CreateUser';
import DeleteUser from './component/DeleteUser';
import EditUser from './component/EditUser';

function App() {
  const [allData, setAllData] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setAllData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateUser = async (editedUser) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${editedUser.id}`,
        editedUser
      );

      if (response.status === 200) {
        // Update the user in the state with the edited data
        setAllData((prevState) =>
          prevState.map((user) =>
            user.id === editedUser.id ? { ...user, ...editedUser } : user
          )
        );
        setEditingUser(null); // Clear editingUser state after saving
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Router>
      <div>
        <Link to='/' className='m-4'>Read Data</Link>
        <Link to='/create' className='m-4'>Create New User</Link>
        <Link to='/delete' className='m-4'>Delete User</Link>
      </div>
      <Routes>
        <Route path='/' element={<ReadData allData={allData} />} />
        <Route path='/create' element={<CreateUser allData={allData} setAllData={setAllData} />} />
        <Route path='/delete' element={<DeleteUser allData={allData} setAllData={setAllData} />} />
        <Route
          path='/edit/:userId'
          element={
            <EditUser
              user={allData.find((user) => user.id === Number(useParams().userId))}
              onUpdateUser={handleUpdateUser}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
