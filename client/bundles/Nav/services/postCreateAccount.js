export const postCreateAccount = (username, password) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      body: JSON.stringify({
          user: {
              username,
              password
          }
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      
      return res.json().then(data => Promise.reject(data))
    })
    .catch(error => console.error(error))
}