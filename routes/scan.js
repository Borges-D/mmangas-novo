const express = require('express');
const router = express.Router();
const Scan = require('../model/Scan');

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

// Buscar scan por slug (em vez de id)
router.get('/:slug', async (req, res) => {
    try {
        const scan = await Scan.findOne({ slug: req.params.slug });
        if (!scan) return res.status(404).json({ message: 'Scan não encontrada' });
        res.json(scan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Atualizar scan por slug
router.put('/:slug', async (req, res) => {
    try {
        const scanAtualizada = await Scan.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
        if (!scanAtualizada) return res.status(404).json({ message: 'Scan não encontrada' });
        res.json(scanAtualizada);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Deletar scan por slug
router.delete('/:slug', async (req, res) => {
    try {
        const scanDeletada = await Scan.findOneAndDelete({ slug: req.params.slug });
        if (!scanDeletada) return res.status(404).json({ message: 'Scan não encontrada' });
        res.json({ message: 'Scan deletada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
