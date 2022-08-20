import axios from 'axios'
const http = axios.create({
    baseURL: 'http://quickcash.test',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true
})

export default http