import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { postLogin } from '../../services/postLogin'

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const { mutate: mutateLogin } = useMutation({
    mutationFn: (formData) => postLogin(formData),
    onSuccess: (data, variables) => {
      setUser(variables.username)
      localStorage.setItem(
        'quoted-session',
        JSON.stringify({ token: data.token, username: variables.username })
      )

      setFormData({
        username: '',
        password: '',
      })
      setCollapsed(true)
    },
    onError: () => console.log('error'),
  })

  const handleLogin = (event) => {
    event.preventDefault()
    mutateLogin(formData)
  }

  const handleInputChange = (event) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })

  return (
    <form onSubmit={handleLogin}>
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
  )
}

export default Login
