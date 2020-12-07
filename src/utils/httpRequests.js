import axios from 'axios';
import store from '../store'
import { API } from '@/config/Index'

const AuthApiGet = async (url, params) => {
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            url: `${API}${url}`,
            headers: {
                Authorization: `Bearer ${store.state.accessToken}`
            },
            params
        }).then(response => resolve(response))
            .catch(err => reject(err))
    })
};

const AuthApiPost = async (url, data) => {
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: `${API}${url}`,
            headers: {
                Authorization: `Bearer ${store.state.accessToken}`
            },
            data
        }).then(response => resolve(response))
            .catch(err => reject(err))
    })
};

const AuthApiPostMultipartFormData = async (url, data) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `${API}${url}`,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${store.state.accessToken}`
            },
            data
        }).then(res => resolve(res)).catch(err => reject(err))
    })
}

const AuthApiPut = async (url, data) => {
    return new Promise((resolve, reject) => {
        axios({
            method: "put",
            url: `${API}${url}`,
            headers: {
                Authorization: `Bearer ${store.state.accessToken}`
            },
            data
        }).then(res => resolve(res))
            .catch(err => reject(err))
    })
}

const AuthApiPutMultipartFormData = async (url, data) => {
    return new Promise((resolve, reject) => {
        axios({
            method: "put",
            url: `${API}${url}`,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${store.state.accessToken}`
            },
            data
        }).then(res => resolve(res))
            .catch(err => reject(err))
    })
}

const AuthApiGetBlob = async (url, params) => {
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            url: `${API}${url}`,
            headers: {
                Authorization: `Bearer ${store.state.accessToken}`
            },
            responseType: "blob",
            params
        }).then(response => resolve(response))
            .catch(err => reject(err))
    })
};

const AuthApiDelete = async (url, params) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'delete',
            url: `${API}${url}`,
            headers: {
                Authorization: `Bearer ${store.state.accessToken}`
            },
            params
        }).then(res => resolve(res))
            .catch(err => reject(err))
    })
}


const ApiPost = async (url, data) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `${API}${url}`,
            // headers: getHeader(),
            data
        }).then(res => resolve(res)).catch(err => reject(err))
    })
}



export {
    AuthApiGet,
    AuthApiPost,
    AuthApiPostMultipartFormData,
    AuthApiGetBlob,
    AuthApiPut,
    AuthApiPutMultipartFormData,
    AuthApiDelete,
    ApiPost,
}