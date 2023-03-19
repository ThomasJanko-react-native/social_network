import axios from 'axios'

const URL = 'http://192.168.0.19:5056/api/post'

export default{
    
    addPost(form, jwt){
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
        return axios.get(`${URL}/posts`)
        .then(res=>res)
        .catch(err=>err)
    },

    addComment(post_id, jwt, form){
      console.log(form)
      const config = {
        headers: {
          authorization: jwt,
        },
      };
      return axios.post(`${URL}/comment/${post_id}`, form, config)
      .then(res=>res)
      .catch(err=>err)
    }

    
    
}
  