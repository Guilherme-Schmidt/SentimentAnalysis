import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/users/login', {
                email: email,
                password: password,
            });

            // Sucesso - redireciona para uma página protegida
            if (response.status === 200) {
                console.log("Login realizado com sucesso");
                navigate('/dashboard');
            }
        } catch (error) {
            setErrorMessage('Credenciais inválidas. Tente novamente.');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <a href="/register">Don't have an account? Register</a>
        </div>
    );
};

export default Login;
