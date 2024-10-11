import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        console.log('Dados do formulário:', { name, email, password });

        try {
            const response = await axios.post('http://localhost:8080/users/register', {
                name:name,
                email: email,
                password: password,
            });

            // Sucesso - redireciona para a página de login
            if (response.status === 200) {
                console.log("Cadastro realizado com sucesso");
                navigate('/login');
            }
        } catch (error) {
            setErrorMessage('Erro ao realizar cadastro. Tente novamente.');
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
            <input 
                    type="text" 
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                
                <button type="submit">Register</button>
            </form>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <a href="/login">Already have an account? Login</a>
        </div>
    );
};

export default Register
