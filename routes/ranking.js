const express = require('express');
const router = express.Router();
const { Usuario } = require('../model/db');

// ... outras rotas existentes ...

router.get('/ranking/top3', async (req, res) => {
    try {
        const topUsuarios = await Usuario.find({
            mangasLidos: { $gt: 0 } // Apenas usuários que leram pelo menos um mangá
        })
            .select('username mangasLidos level rankSemana')
            .sort({ mangasLidos: -1, level: -1 })
            .limit(3);

        res.json(topUsuarios);
    } catch (error) {
        console.error('Erro ao buscar ranking:', error);
        res.status(500).json({
            message: 'Erro ao buscar ranking',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = router;