import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});
console.log("process.env.REACT_APP_API_BASE_URL",process.env.REACT_APP_API_BASE_URL);

apiClient.interceptors.request.use(
  (config) => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('authToken='))
      ?.split('=')[1];
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const loginUser = (data) => apiClient.post("/login", data);

export const fetchUserList = (params) => 
  apiClient.get('/user-list', { params });

export const deleteUser = (userId) => 
  apiClient.post(`/user-delete/${userId}`);

export const addProduct = (formData) =>
    apiClient.post("/add-product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
export const fetchProducts = (page = 1, perPage = 10) => {
        return apiClient.get('/product-list', {
          params: { page, perPage },
        });
 };

 export const registerUser = (formData) => 
    apiClient.post('/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });


    export const fetchCountries = () => apiClient.get('/country-list');
    export const fetchStates = (countryId) => apiClient.get(`state-list?country_id=${countryId}`);