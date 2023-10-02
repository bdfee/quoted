import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { postAccount } from '../../services/accountService'
import styles from './Menu.module.css'

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
    <form onSubmit={handleSubmit} className={styles['create-account-form']}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        required
      />

      <button type="submit">Create Account</button>
    </form>
  )
}

export default CreateAccount
