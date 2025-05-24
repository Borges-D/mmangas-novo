import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/capitulos';

export default function CapituloPage() {
    const { id } = useParams();
    const [capitulo, setCapitulo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCapitulo() {
            try {
                setLoading(true);
                const res = await fetch(`${API_URL}/${id}`);
                if (!res.ok) throw new Error('Erro ao carregar capítulo');
                const data = await res.json();
                setCapitulo(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCapitulo();
    }, [id]);

    if (loading) return <p>Carregando capítulo...</p>;
    if (error) return <p>Erro: {error}</p>;
    if (!capitulo) return <p>Capítulo não encontrado</p>;

    return (
        <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
            <h2>
                Capítulo {capitulo.numero} - {capitulo.titulo || 'Sem título'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {capitulo.paginas && capitulo.paginas.length > 0 ? (
                    capitulo.paginas.map((paginaUrl, idx) => {
                        // Verifica se é PDF pelo final da URL
                        if (paginaUrl.toLowerCase().endsWith('.pdf')) {
                            return (
                                <a
                                    key={idx}
                                    href={paginaUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        padding: 10,
                                        border: '1px solid #ccc',
                                        borderRadius: 4,
                                        textDecoration: 'none',
                                        color: '#007bff',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Abrir página {idx + 1} (PDF)
                                </a>
                            );
                        }
                        // Caso seja imagem
                        return (
                            <img
                                key={idx}
                                src={paginaUrl}
                                alt={`Página ${idx + 1}`}
                                style={{ width: '100%', borderRadius: 8 }}
                                loading="lazy"
                            />
                        );
                    })
                ) : (
                    <p>Sem páginas para exibir.</p>
                )}
            </div>
        </div>
    );
}
