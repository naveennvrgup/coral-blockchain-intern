import axios from 'axios';

let burl = '/'

let curr = process.env.NODE_ENV

if (curr === 'development') {
    burl = 'http://localhost:3000/'
}

export default () => {
    return axios.create({
        baseURL: burl,
    })
};

