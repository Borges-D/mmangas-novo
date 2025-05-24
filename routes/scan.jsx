import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<div>Home funcionando</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
