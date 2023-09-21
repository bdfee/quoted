import React, { useState } from 'react';

const Login = ({ setLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [collapsed, setCollapsed] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
      body: JSON.stringify({
        session: {
          username: formData.username,
          password: formData.password,
        },
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => Promise.reject(data));
        }
      })
      .then((data) => {
        console.log(data);
        const { token } = data;
        localStorage.setItem('quoted-session', token);
        setFormData({
            username: '',
            password: '',
          });
          setLoggedIn(true)
      })
      .catch((error) => console.error(error));


  };

  return (
    <>
      <h2 onClick={() => setCollapsed(!collapsed)}>Log In</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: collapsed ? 'none' : 'block',
          backgroundColor: 'whitesmoke',
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
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default Login;