const express = require('express');
const router = express.Router();
const scan = require('../model/Scan');

// Criar uma scan
router.post('/', async (req, res) => {
    try {
        const novaScan = new Scan(req.body);
        const salvaScan = await novaScan.save();
        res.status(201).json(salvaScan);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Listar todas as scans
router.get('/', async (req, res) => {
    try {
        const scans = await Scan.find();
        res.json(scans);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Buscar scan por id
router.get('/:id', async (req, res) => {
    try {
        const scan = await Scan.findById(req.params.id);
        if (!scan) return res.status(404).json({ message: 'Scan não encontrada' });
        res.json(scan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Atualizar scan
router.put('/:id', async (req, res) => {
    try {
        const scanAtualizada = await Scan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!scanAtualizada) return res.status(404).json({ message: 'Scan não encontrada' });
        res.json(scanAtualizada);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Deletar scan
router.delete('/:id', async (req, res) => {
    try {
        const scanDeletada = await Scan.findByIdAndDelete(req.params.id);
        if (!scanDeletada) return res.status(404).json({ message: 'Scan não encontrada' });
        res.json({ message: 'Scan deletada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
