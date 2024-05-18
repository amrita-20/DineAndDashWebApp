// Abstraction to avoid repeat and error, and for future scalability
function chainPromise(promise) {
  return promise
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

// Get menu
export function fetchMenu() {
  const fetched = fetch("/api/v1/menu");
  return chainPromise(fetched);
}
