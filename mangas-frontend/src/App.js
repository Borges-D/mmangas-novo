import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import das páginas
import HomePage from "./pages/HomePage";

import CapitulosList from "./pages/CapitulosList";  // Lista de capítulos do mangá
import CapituloPage from "./pages/CapituloPage";    // Página de leitura do capítulo
import RankingPage from "./pages/RankingPage";      // Página completa do ranking
import ScansPage from "./pages/ScansPage";
import MangaPage from "./pages/MangasPage";          // Página para scans

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />

                {/* Mangá e capítulos */}
                <Route path="/manga/:mangaSlug" element={<MangaPage />} />
                <Route path="/manga/:mangaSlug/capitulos" element={<CapitulosList />} />
                <Route path="/capitulo/:capituloId" element={<CapituloPage />} />

                {/* Ranking */}
                <Route path="/ranking" element={<RankingPage />} />

                {/* Scans */}
                <Route path="/scans" element={<ScansPage />} />
            </Routes>
        </Router>
    );
}

export default App;
