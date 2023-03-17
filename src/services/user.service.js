import axios from 'axios'

const URL = 'http://192.168.77.238:5056/api/user'

export default{
    
    register(form){
        console.log('register')
        return axios.post(`${URL}/register`, form)
        .then(res=>res)
        .catch(err=>err)
    },

    login(form){
        console.log('login')
        return axios.post(`${URL}/login`, form)
        .then(res=>res)
        .catch(err=>console.log(err))
    },

    getUserAuth(jwt){
        const config = {
            headers: {
              authorization: jwt,
            },
          };
        return axios.get(`${URL}/auth`, config)
        .then(res=>res)
        .catch(err=>console.log(err))
    },
    
}
  