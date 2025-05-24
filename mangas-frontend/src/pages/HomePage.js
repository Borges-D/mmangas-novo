import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

const rankTitlesByLevel = {
    low: [
        "🐣 Novato Otaku",
        "🍜 Comerciantes de Ramen",
        "🦥 Mestre da Preguiça",
        "👾 Jogador Casual",
        "🎲 Roleta Otaku",
        "📺 Viciado em Maratonas",
        "🥤 Rei do Refri",
        "🐢 Andarilho dos Mangás",
        "🐤 Aprendiz de Mangaka",
        "🧃 Colecionador de Marcadores"
    ],
    mid: [
        "🔥 Samurai das Leituras",
        "⚔️ Guerreiro do Papel",
        "🌸 Sensei dos Mangás",
        "🏯 Senhor dos Scanlations",
        "🎴 Mestre do Mangá",
        "🚀 Explorador Otaku",
        "🛡️ Defensor do Mangá",
        "🌙 Caçador de Capítulos",
        "💥 Estourador de Spoilers",
        "👑 Rei do Mangá"
    ],
    high: [
        "🏆 Ninja do Manga",
        "⚡ Mestre dos Mangás Sagrados",
        "🦅 Sábio Otaku Supremo",
        "🌟 Lendário Scanlator",
        "🔥 Imperador dos Mangás",
        "🌌 Guardião das Páginas",
        "⚔️ General das Histórias",
        "👹 Senhor dos Capítulos",
        "💫 Mestre do Universo Otaku",
        "🎇 Deus dos Mangás"
    ]
};

function getTitleByLevel(level, index) {
    if (level <= 5) {
        return rankTitlesByLevel.low[index % rankTitlesByLevel.low.length];
    } else if (level > 15) {
        return rankTitlesByLevel.high[index % rankTitlesByLevel.high.length];
    } else {
        return rankTitlesByLevel.mid[index % rankTitlesByLevel.mid.length];
    }
}

export default function HomePage() {
    const [topRankers, setTopRankers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTopRankers() {
            try {
                const res = await fetch("http://localhost:5000/api/usuarios/ranking/top3"); // Ajuste conforme sua API
                const data = await res.json();
                setTopRankers(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchTopRankers();
    }, []);

    if (loading) return <div style={{ color: "white", textAlign: "center", marginTop: "3rem" }}>Carregando os melhores leitores...</div>;

    if (!topRankers.length) return <div style={{ color: "white", textAlign: "center", marginTop: "3rem" }}>Nenhum leitor encontrado.</div>;

    return (
        <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "white", padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
            <header style={{ marginBottom: 40, textAlign: "center" }}>
                <h1 style={{ fontSize: "2.8rem", color: "#ffcc00", letterSpacing: 2, fontWeight: "900" }}>Mangás & Manhwas</h1>
                <p style={{ fontSize: "1.2rem", opacity: 0.8 }}>Os melhores leitores da comunidade</p>
            </header>

            <section style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: "1.8rem", color: "#ffcc00", marginBottom: 20 }}>Top 3 Leitores da Semana</h2>
                <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
                    {topRankers.map((user, i) => (
                        <Link
                            to="/ranking"
                            key={user._id}
                            style={{
                                flex: "1 1 280px",
                                backgroundColor: "#1f1f1f",
                                borderRadius: 10,
                                padding: "1.5rem",
                                color: "white",
                                textDecoration: "none",
                                boxShadow: "0 0 12px rgba(255, 204, 0, 0.8)",
                                transition: "transform 0.3s ease",
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                        >
                            <div style={{ fontSize: 22, fontWeight: "bold", color: "#ffcc00", marginBottom: 8, textAlign: "center" }}>
                                {getTitleByLevel(user.level || 1, i)}
                            </div>
                            <div style={{ fontSize: 48, fontWeight: "900", color: "#ffcc00", marginBottom: 12 }}>{i + 1}</div>
                            <h3 style={{ margin: "0 0 10px", fontWeight: "700" }}>{user.username}</h3>
                            <p style={{ margin: 0 }}>Nível: <strong>{user.level || 1}</strong></p>
                            <p style={{ margin: 0 }}>Mangás lidos: <strong>{user.mangasLidos || 0}</strong></p>
                            <p style={{ margin: "6px 0 0", fontStyle: "italic", fontSize: "0.9rem", opacity: 0.8 }}>
                                Ranking da semana: <strong>{user.rankSemana || "-"}</strong>
                            </p>
                        </Link>
                    ))}
                </div>
            </section>

            <footer style={{ textAlign: "center" }}>
                <Link to="/ranking"
                      style={{
                          color: "#ffcc00",
                          fontWeight: "bold",
                          textDecoration: "underline",
                          fontSize: "1rem",
                          cursor: "pointer"
                      }}
                >
                    Ver ranking completo &raquo;
                </Link>
            </footer>
        </div>
    );
}
