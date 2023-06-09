import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

function Users() {
  const [users,setUsers]=useState([]);
  const [loading,setLoading] = useState(false);
  const {setNotification} = useStateContext();
  useEffect(()=> {
    getUsers()
  },[]);

  const onDeleteClick = user => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        setNotification('User was successfully deleted')
        getUsers()
      })
  }

  const  getUsers =() => {
    setLoading(true)
    axiosClient.get('/users')
      .then(({data}) => {
        setUsers(data.data);
        setLoading(false)
        console.log(data);
      })
      .catch(()=>{
        setLoading(false);
      })
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Users</h1>
        <Link to="/users/new" className="btn-add">Add new</Link>
      </div>
      <div className='card animated fadeInDown'>
        <table>
          <thead>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created Date</th>
            <th>Action</th>
          </thead>
          {loading && <tbody>
            <tr>
              <td colSpan="5" className='text-center'>Loading...</td>
            </tr>
          </tbody>}
          {!loading &&<tbody>
            {users.map(u => (
              <tr>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.created_at}</td>
                <td>
                  <Link className='btn-edit' to={'/users/'+u.id}>edit</Link>
                  &nbsp;
                  <button onClick={ev => onDeleteClick(u)}  className='btn-delete'>Delete</button>
                </td>
              </tr>
            ))}

          </tbody>}
        </table>
      </div>
      </div>
  )
}

export default Users