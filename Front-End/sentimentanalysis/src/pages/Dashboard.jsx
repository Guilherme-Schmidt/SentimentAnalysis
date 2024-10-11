import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [term, setTerm] = useState('');
    const [terms, setTerms] = useState([]);
    const [editingTermId, setEditingTermId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    // Função para carregar os termos
    const loadTerms = async () => {
        try {
            const response = await axios.get('http://localhost:8080/terms'); // Endpoint para obter termos
            setTerms(response.data);
        } catch (error) {
            console.error('Erro ao carregar termos:', error);
            setErrorMessage('Erro ao carregar termos. Tente novamente.');
        }
    };

    // useEffect para carregar os termos ao montar o componente
    useEffect(() => {
        loadTerms();
    }, []);

    // Função para adicionar ou editar um termo
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingTermId) {
                // Editar termo existente
                await axios.put(`http://localhost:8080/terms/${editingTermId}`, { term });
            } else {
                // Adicionar novo termo
                await axios.post('http://localhost:8080/terms', { term });
            }
            setTerm(''); // Limpar campo
            setEditingTermId(null); // Resetar estado de edição
            loadTerms(); // Recarregar termos
        } catch (error) {
            console.error('Erro ao salvar termo:', error);
            setErrorMessage('Erro ao salvar termo. Tente novamente.');
        }
    };

    // Função para editar um termo
    const handleEdit = (termToEdit) => {
        setTerm(termToEdit.name); // Supondo que cada termo tem um campo "name"
        setEditingTermId(termToEdit.id); // Configura o ID do termo em edição
    };

    // Função para remover um termo
    const handleDelete = async (termId) => {
        try {
            await axios.delete(`http://localhost:8080/terms/${termId}`);
            loadTerms(); // Recarregar termos após remoção
        } catch (error) {
            console.error('Erro ao remover termo:', error);
            setErrorMessage('Erro ao remover termo. Tente novamente.');
        }
    };

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Insira um novo termo"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    required
                />
                <button type="submit">{editingTermId ? 'Editar' : 'Adicionar'}</button>
            </form>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Termo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {terms.map((term) => (
                        <tr key={term.id}>
                            <td>{term.id}</td>
                            <td>{term.name}</td>
                            <td>
                                <button onClick={() => handleEdit(term)}>Editar</button>
                                <button onClick={() => handleDelete(term.id)}>Remover</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
