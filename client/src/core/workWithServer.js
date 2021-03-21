const workWithServer = () => {
  const server_url = 'http://localhost:8000'

  return {
    initUser: () => {
      return Promise.resolve({
        username: 'efim',
        email: 'efim@mail.ru'
      })
      // return requestGet(server_url + '/api/current_user/')
    },
    login: (data) => {
      return requestPost(server_url + '/api/login/', data)
    },
    restorePassword: (data) => {
      return requestPost(server_url + '/api/restorePassword/', data)
    },
    setNewPassword: (data) => {
      return requestPost(server_url + '/api/setNewPassword/', data)
    },
    signUp: (data) => {
      return requestPost(server_url + '/api/signUp/', data)
    },
    changeUserInfo: (data) => {
      return requestPostWithFile(server_url + '/api/changeUserInfo/', data)
    },
    logOut: () => {
      return requestPost(server_url + '/api/logout/')
    },
    closeAllSession: () => {
      return requestPost(server_url + '/api/logoutall/')
    },
    initStaticData: () => {
      return requestGet(server_url + '/api/init_static_data/')
    },
    getPlatformInfo: (data) => {
      return requestPost(server_url + '/api/getPlatformInfo/', data)
    },
  }
}

export default workWithServer()


function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response.json())
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

async function request(url, body) {
  const response = await fetch(url, body).then(status)
  response.token && setCookie('token', response.token)
  return response;
}

async function requestGet(url) {
  const headers = {}
  getCookie('token') && (headers['Authorization'] = `Token  ${getCookie('token')}`)
  return await request(url, {
    method: 'GET',
    headers: headers,
  })
}

async function requestPost(url, data) {
  const headers = {
    'Content-Type': 'application/json',
  }
  getCookie('token') && (headers['Authorization'] = `Token ${getCookie('token')}`)

  return await request(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
}

async function requestPostWithFile(url, data) {
  const headers = {}
  getCookie('token') && (headers['Authorization'] = `JWT ${getCookie('token')}`)
  const form = new FormData();
  const keys = Object.keys(data);
  keys.forEach(key => {
    form.append(key, data[key])
  })
  return await request(url, {
    method: 'POST',
    headers: headers,
    body: form
  })
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([.$?*|{}()[]\/+^])/g, '\\$1') + "=([^;]*)"
  ))
  return matches ? decodeURIComponent(matches[1]) : undefined
}

const setCookie = (name, value, props = {'Path': '/', maxAge: 1800}) => {
  let exp = props.expires
  if (typeof exp == "number" && exp) {
    let d = new Date()
    d.setTime(d.getTime() + exp * 1000)
    exp = props.expires = d
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString()
  }

  value = encodeURIComponent(value)
  let updatedCookie = name + "=" + value

  for (let propName in props) {
    updatedCookie += "; " + propName
    let propValue = props[propName]
    if (propValue !== true) {
      updatedCookie += "=" + propValue
    }
  }

  document.cookie = updatedCookie
}
