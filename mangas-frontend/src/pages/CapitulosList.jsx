import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/api/capitulos";

export default function CapitulosList() {
    const { mangaSlug } = useParams();
    const [capitulos, setCapitulos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCapitulos() {
            try {
                setLoading(true);
                const res = await fetch(`${API_URL}?mangaSlug=${mangaSlug}`);
                if (!res.ok) throw new Error("Erro ao buscar capítulos");
                const data = await res.json();
                setCapitulos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchCapitulos();
    }, [mangaSlug]);

    if (loading) return <p>Carregando capítulos...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
            <h1>Capítulos do mangá: {mangaSlug}</h1>
            {capitulos.length === 0 && <p>Nenhum capítulo encontrado.</p>}
            <ul style={{ listStyle: "none", padding: 0 }}>
                {capitulos.map((capitulo) => (
                    <li key={capitulo._id} style={{ marginBottom: 10 }}>
                        <Link to={`/capitulo/${capitulo._id}`}>
                            Capítulo {capitulo.numero} - {capitulo.titulo || "Sem título"}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
