import axios from 'axios';

// const API = axios.create({baseURL: "https://my-diary-back.herokuapp.com/"})
// API.interceptors.request.use((req)=>{
//     if(localStorage.getItem('profile')){
//         req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }
// })
const token = localStorage.getItem('profile')?`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`:null
const url = 'https://social-media-app-server.vercel.app/posts'

export const fetchposts = ()=>axios.get(url);
export const createPost=(newPost)=>axios({
    url:url,
    method:'POST',
    data:newPost,
    headers:{
        authorization:token
    }
})
export const updatePost=(id,updatedpost)=>axios({
    url:`${url}/${id}`,
    method:'PUT',
    data:updatedpost,
    headers:{
        authorization:token
    }
})
export const deletePost = (id)=>axios({
    url:`${url}/${id}`,
    method:'DELETE',
    headers:{
        authorization:token
    }
});
export const likePost = (id)=>axios({
    url:`${url}/${id}/likePost`,
    method:'PUT',
    headers:{
        authorization:token
    }
})
const url2='https://social-media-app-server.vercel.app/users'
export const signIn = (formData)=>axios({
    url:`${url2}/signin`,
    data:formData,
    method:'POST',
});
export const signUp = (formData)=>axios({
    url:`${url2}/signup`,
    data:formData,
    method:'POST',
})
