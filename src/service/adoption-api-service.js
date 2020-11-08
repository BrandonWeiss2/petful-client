import config from '../config'

const AdoptionApiService = {
  getPets() {
    console.log('getPets')
    return fetch(`${config.API_ENDPOINT}/pets`, {
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(event => Promise.reject(event))
          : res.json()
      )
  },
  deletePets(type) {
    console.log('deletePets')
    return fetch(`${config.API_ENDPOINT}/pets`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: type,
      })  
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(event => Promise.reject(event))
          : res.json()
      )
  },
  postPeople(name) {
    console.log('postPeople', name)
    return fetch(`${config.API_ENDPOINT}/people`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
      })  
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(event => Promise.reject(event))
          : res.json()
      )
  },
  getPeople() {
    return fetch(`${config.API_ENDPOINT}/people`, {
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(event => Promise.reject(event))
          : res.json()
      )
  },
  deletePeople() {
    return fetch(`${config.API_ENDPOINT}/people`, {
      method: 'DELETE',
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(event => Promise.reject(event))
          : res.json()
      )
  },
}

export default AdoptionApiService