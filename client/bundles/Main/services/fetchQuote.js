export const fetchQuote = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch('/api/new_quote', {
          method: 'GET',
        });
        const data = await res.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }