export const postScore = async (isCorrect) => {
    const headers = {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
    }

    // if logged in user
    const token = window.localStorage.getItem('quoted-session')

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    fetch('/api/scores', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        score_type: isCorrect ? 'correct' : 'incorrect'
      })
    })
  }
