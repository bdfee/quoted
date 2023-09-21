import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query'
import { postCreateAccount } from '../services/postCreateAccount'


const CreateAccount = ({ setUser }) => {
  const [collapsed, setCollapsed] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { mutate: mutateCreateAccount } = useMutation({
    mutationFn: ({username, password}) => postCreateAccount(username, password),
    onSuccess: (_, variables) => {
      setUser(variables.username)
      setFormData({
        username: '',
        password: ''
      })
    }
  })

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mutateCreateAccount(formData)
  };

  return (
    <>
      <h2
        onClick={() => setCollapsed(!collapsed)}
      >Sign Up</h2>
      <form onSubmit={handleSubmit}
        style={{ 
            display: collapsed ? 'none' : 'block',
            backgroundColor: 'whitesmoke'
        }}
      >
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">SignUp</button>
      </form>
    </>
  );
};

export default CreateAccount;