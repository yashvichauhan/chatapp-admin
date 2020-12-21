import axios from 'axios';

const instance=axios.create({
    baseURL: 'http://localhost:4004',
    headers: {
        'content-type':'application/json',
    },
});

export default instance;