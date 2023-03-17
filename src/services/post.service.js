import axios from 'axios'

const URL = 'http://192.168.77.238:5056/api/post'

export default{
    
    addPost(form, jwt){
        console.log('JWT', jwt)
        const config = {
            headers: {
              authorization: jwt,
            },
          };
        console.log('register')
        return axios.post(`${URL}/post`, form, config)
        .then(res=>res)
        .catch(err=>err)
    },
    getPosts(){
        console.log('getPosts')
        return axios.get(`${URL}/posts`)
        .then(res=>res)
        .catch(err=>err)
    }

    
    
}
  