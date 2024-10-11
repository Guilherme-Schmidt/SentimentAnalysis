// src/services/userService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/users'; // URL da sua API de usuário

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const loginUser = async (loginData) => {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data;
};
