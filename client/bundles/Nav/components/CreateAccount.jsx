import React, { useState } from 'react';

const CreateAccount = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [collapsed, setCollapsed] = useState(true)


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            user: {
                username: formData.username,
                password: formData.password
            }
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json()
        } else {
            return res.json().then(data => Promise.reject(data))
        }
    })
    .then(data => console.log(data))
    .catch(error => console.error(error))

    setFormData({
      username: '',
      password: '',
    });
  };

  return (
    <div>
      <h2
        onClick={() => setCollapsed(!collapsed)}
      >Sign Up</h2>
      <form onSubmit={handleSubmit}
        style={{ 
            visibility: collapsed ? 'hidden' : 'visible',
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default CreateAccount;