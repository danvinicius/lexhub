import axios from 'axios';
const { VITE_API_URL } = import.meta.env;

const api = axios.create({
	baseURL: VITE_API_URL,
});

export default api;
