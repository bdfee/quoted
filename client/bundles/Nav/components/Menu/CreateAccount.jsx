import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { postAccount } from '../../services/accountService'

const CreateAccount = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const { mutate: mutateCreateAccount } = useMutation({
    mutationFn: (formData) => postAccount(formData),
    onSuccess: (_, variables) => {
      setUser(variables.username)
      setFormData({
        username: '',
        password: '',
      })
    },
  })

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    mutateCreateAccount(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Create Account</button>
    </form>
  )
}

export default CreateAccount
