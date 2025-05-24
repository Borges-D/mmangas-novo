import React, { useState, useEffect } from 'react';

import { useParams, Link } from "react-router-dom";

export default function MangaPage() {
    const { mangaSlug } = useParams();
    const [manga, setManga] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchManga() {
            try {
                const res = await fetch(`http://localhost:5000/api/mangas/${mangaSlug}`);
                const data = await res.json();
                setManga(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchManga();
    }, [mangaSlug]);

    if (loading) return <div style={{color: 'white', textAlign: 'center', marginTop: '2rem'}}>Carregando...</div>;

    if (!manga) return <div style={{color: 'white', textAlign: 'center', marginTop: '2rem'}}>Mangá não encontrado.</div>;

    return (
        <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "white", padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                <img
                    src={manga.imagemCapa || "https://via.placeholder.com/200x300?text=No+Cover"}
                    alt={manga.titulo}
                    style={{ width: 200, height: 300, objectFit: "cover", borderRadius: 8, flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: 250 }}>
                    <h1 style={{ color: "#ffcc00", marginBottom: 8 }}>{manga.titulo}</h1>
                    <p style={{ fontStyle: "italic", color: "#bbb", marginBottom: 12 }}>{manga.autor || "Autor desconhecido"}</p>
                    <p style={{ lineHeight: 1.5, marginBottom: 12 }}>{manga.descricao || "Sem descrição disponível."}</p>
                    <p><strong>Gêneros:</strong> {manga.generos?.length ? manga.generos.join(", ") : "N/A"}</p>
                    <p><strong>Scan:</strong> {manga.scanSlug}</p>

                    <Link to={`/manga/${mangaSlug}/capitulos`}
                          style={{
                              display: "inline-block",
                              marginTop: 16,
                              padding: "10px 20px",
                              backgroundColor: "#ffcc00",
                              color: "#121212",
                              borderRadius: 5,
                              textDecoration: "none",
                              fontWeight: "bold",
                              transition: "background-color 0.3s"
                          }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#e6b800"}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = "#ffcc00"}
                    >
                        Ver capítulos
                    </Link>
                </div>
            </div>
        </div>
    );
}
