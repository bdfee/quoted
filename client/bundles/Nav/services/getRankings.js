export const getRankings = () => {
    return fetch('/api/rankings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.json().then((data) => Promise.reject(data)); 
    })
    .catch((error) => console.error(error));
    }