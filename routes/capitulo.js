const express = require('express');
const router = express.Router();
const Capitulo = require('../model/Capitulo');

// Criar capítulo
router.post('/', async (req, res) => {
    try {
        const novoCapitulo = new Capitulo(req.body);
        const salvoCapitulo = await novoCapitulo.save();
        res.status(201).json(salvoCapitulo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Listar capítulos
router.get('/', async (req, res) => {
    try {
        const capitulos = await Capitulo.find().populate('manga');
        res.json(capitulos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Buscar capítulo por id
router.get('/:id', async (req, res) => {
    try {
        const capitulo = await Capitulo.findById(req.params.id).populate('manga');
        if (!capitulo) return res.status(404).json({ message: 'Capítulo não encontrado' });
        res.json(capitulo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Atualizar capítulo
router.put('/:id', async (req, res) => {
    try {
        const capituloAtualizado = await Capitulo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!capituloAtualizado) return res.status(404).json({ message: 'Capítulo não encontrado' });
        res.json(capituloAtualizado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Deletar capítulo
router.delete('/:id', async (req, res) => {
    try {
        const capituloDeletado = await Capitulo.findByIdAndDelete(req.params.id);
        if (!capituloDeletado) return res.status(404).json({ message: 'Capítulo não encontrado' });
        res.json({ message: 'Capítulo deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
