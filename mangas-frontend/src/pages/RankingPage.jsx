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
  } else if (level <= 15) {
    return rankTitlesByLevel.mid[index % rankTitlesByLevel.mid.length];
  } else {
    return rankTitlesByLevel.high[index % rankTitlesByLevel.high.length];
  }
}

export default function RankingPage() {
  const [rankers, setRankers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRankers() {
      try {
        const res = await fetch("http://localhost:5000/api/usuarios/ranking"); // ajuste a URL da sua API
        const data = await res.json();
        setRankers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchRankers();
  }, []);

  if (loading) return <div style={{ color: "white", textAlign: "center", marginTop: "2rem" }}>Carregando ranking...</div>;

  if (!rankers.length) return <div style={{ color: "white", textAlign: "center", marginTop: "2rem" }}>Nenhum ranker disponível.</div>;

  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "white", padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1 style={{ color: "#ffcc00", marginBottom: 20, textAlign: "center" }}>Top Leitores</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
        {rankers.map((user, i) => (
          <div
            key={user._id}
            style={{
              backgroundColor: "#1f1f1f",
              padding: "1rem",
              borderRadius: 8,
              textAlign: "center",
              boxShadow: "0 0 8px rgba(255, 204, 0, 0.5)",
              transition: "transform 0.2s",
              cursor: "pointer"
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div style={{ fontSize: 18, fontWeight: "bold", color: "#ffcc00", marginBottom: 6 }}>
              {getTitleByLevel(user.level || 1, i)}
            </div>
            <div style={{ fontSize: 48, fontWeight: "bold", color: "#ffcc00" }}>{i + 1}</div>
            <h2 style={{ margin: "10px 0" }}>{user.username}</h2>
            <p>Nível: {user.level || 1}</p>
            <p>Mangás Lidos: {user.mangasLidos || 0}</p>
            <p>Ranking da semana: {user.rankSemana || "-"}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 30, textAlign: "center" }}>
        <Link to="/"
          style={{
            color: "#ffcc00",
            textDecoration: "underline",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Voltar para a Home
        </Link>
      </div>
    </div>
  );
}
