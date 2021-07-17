export const fetcher = (url, method, data, headers) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  }).then((data) => data.json());
};
