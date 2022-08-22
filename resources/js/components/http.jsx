import axios from 'axios'
const http = axios.create({
    baseURL: 'http://quickcash.test',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    },
    withCredentials: true
})

export default http