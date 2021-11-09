import axios from "axios";

console.log('base', import.meta.env)

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});

export default instance