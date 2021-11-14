import axios from "axios";

const db = axios.create({
    baseURL: `${'http://localhost:3001/'}`,
    timeout: 1000,
}); export default db;