import axios from 'axios';

burl = 'localhost:3000/'

let curr = process.env.NODE_ENV
console.log(curr);

if (curr === 'production') {
    burl = '/'
}

export default () => {
    return axios.create({
        baseURL: burl,
    })
};

