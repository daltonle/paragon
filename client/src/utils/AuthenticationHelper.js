export const login = async (values, resolve, reject) => {
  fetch('http://localhost:8000/account/login/', {
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  })
  .then(res => {
    if (res.status === 200)
      resolve(res.json())
    else if (res.status === 400)
      reject("Wrong username or password.")
  })
  .catch(err => console.log(err))
}