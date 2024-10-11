import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

const Dashboard = () => {
    const [terms, setTerms] = useState([]);
    const [term, setTerm] = useState('');
    const [polarity, setPolarity] = useState('');
    const [editingTermId, setEditingTermId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTerms = async () => {
            try {
                const response = await axios.get('http://localhost:8080/lexical/listTerms');
                setTerms(response.data);
            } catch (error) {
                setErrorMessage("Erro ao carregar os termos.");
                console.error("Erro ao carregar os termos:", error);
            }
        };
        fetchTerms();
    }, []);

    const handleAddOrUpdateTerm = async (e) => {
        e.preventDefault();
        if (!term || !polarity) return;

        try {
            if (editingTermId) {
                // Atualiza o termo existente
                await axios.put(`http://localhost:8080/lexical/updateTerm/${editingTermId}`, { term, polarity });
                setEditingTermId(null);
            } else {
                // Adiciona um novo termo
                await axios.post('http://localhost:8080/lexical/addTerms', { term, polarity });
            }
            // Limpa os campos
            setTerm('');
            setPolarity('');
            // Atualiza a lista de termos
            const response = await axios.get('http://localhost:8080/lexical/listTerms');
            setTerms(response.data);
        } catch (error) {
            setErrorMessage('Erro ao adicionar ou atualizar o termo. Tente novamente.');
        }
    };

    const handleDeleteTerm = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este termo?")) {
            try {
                await axios.delete(`http://localhost:8080/lexical/deleteTerm/${id}`);
                // Atualiza a lista de termos
                setTerms(terms.filter(t => t.id !== id));
            } catch (error) {
                setErrorMessage('Erro ao remover o termo. Tente novamente.');
            }
        }
    };

    const handleEditTerm = (term) => {
        setTerm(term.term);
        setPolarity(term.polarity);
        setEditingTermId(term.id);
    };

    return (
        <div className="container">
            <h2>Dashboard</h2>
            <form onSubmit={handleAddOrUpdateTerm} className="term-form">
                <input 
                    type="text" 
                    placeholder="Term"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className="term-input"
                />
                <input 
                    type="text" 
                    placeholder="Polarity"
                    value={polarity}
                    onChange={(e) => setPolarity(e.target.value)}
                    className="term-input"
                />
                <button type="submit" className="submit-button">{editingTermId ? 'Update' : 'Add'}</button>
            </form>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <table className="terms-table">
                <thead>
                    <tr>
                        <th>Term</th>
                        <th>Polarity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {terms.map((t) => (
                        <tr key={t.id}>
                            <td>{t.term}</td>
                            <td>{t.polarity}</td>
                            <td className="actions">
                                <button onClick={() => handleEditTerm(t)} className="edit-button">Edit</button>
                                <button onClick={() => handleDeleteTerm(t.id)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
