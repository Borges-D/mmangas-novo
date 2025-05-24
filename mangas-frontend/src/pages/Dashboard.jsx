import React, { useState, useEffect } from 'react';

function Dashboard() {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUsuarios() {
            try {
                const res = await fetch("http://localhost:5000/api/usuarios");
                if (!res.ok) {
                    throw new Error("Falha ao buscar usuários");
                }
                const data = await res.json();
                setUsuarios(data);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchUsuarios();
    }, []);

    return (
        <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
            <h2>Dashboard</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <h3>Lista de Usuários</h3>
            <ul>
                {usuarios.map((u) => (
                    <li key={u._id}>
                        {u.username} ({u.email})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;