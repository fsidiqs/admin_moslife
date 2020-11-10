import axios from 'axios';
import { API } from '@/config/Index'

const AuthApiGet = async (url, params) => {
    return new Promise(resolve => {
        axios({
            method: "get",
            url: `${API}${url}`,
            // headers: getHeader(),
            params
        }).then(response => resolve(response));
    })
};

const AuthApiPost = async (url, data) => {
    return new Promise((resolve) => {
        axios({
            method: "post",
            url: `${API}${url}`,
            // headers: getHeader(),
            data
        }).then(response => resolve(response));
    })
};

const AuthApiPut = async (url, data) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                method: "put",
                url: `${API}${url}`,
                // headers: getHeader(),
                data
            }).then(res => resolve(res));
        } catch (error) {
            reject(error)
        }
    })
}

const AuthApiDelete = async (url, params) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                method: 'delete',
                url: `${API}${url}`,
                // headers: getHeader(),
                params
            }).then(res => resolve(res))
        } catch (error) {
            console.log("error deleting" + url);
            reject(error)
        }
    })
}

export {
    AuthApiGet,
    AuthApiPost,
    AuthApiPut,
    AuthApiDelete,
}