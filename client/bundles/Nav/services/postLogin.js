export const postLogin = (username, password) => {
    return fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
      body: JSON.stringify({
        session: {
          username,
          password,
        },
      }),
    })
    .then((res) => {
    if (res.ok) {
        return res.json();
    }
    return res.json().then((data) => Promise.reject(data));
    })
    .catch((error) => {
    console.error('Error during login:', error);
    throw error;
    });
};

