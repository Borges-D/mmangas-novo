const express = require('express');
const router = express.Router();
const Capitulos = require('../model/Capitulo');
const Manga = require('../model/Manga'); // Importa o modelo Manga
const { Usuario } = require('../model/db');


// Criar capítulo
router.post('/', async (req, res) => {
    try {
        const novoCapitulo = new Capitulos(req.body);
        const salvoCapitulo = await novoCapitulo.save();
        res.status(201).json(salvoCapitulo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Listar capítulos filtrando por mangaSlug
router.get('/', async (req, res) => {
    try {
        const { mangaSlug } = req.query;

        if (!mangaSlug) {
            return res.status(400).json({ message: 'Parâmetro mangaSlug é obrigatório' });
        }

        // Buscar mangá pelo slug
        const manga = await Manga.findOne({ slug: mangaSlug });
        if (!manga) {
            return res.status(404).json({ message: 'Mangá não encontrado' });
        }

        // Buscar capítulos pelo id do mangá
        const capitulos = await Capitulos.find({ manga: manga._id }).sort({ numero: 1 });
        res.json(capitulos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Buscar capítulo por id
router.get('/:id', async (req, res) => {
    try {
        const capitulo = await Capitulos.findById(req.params.id).populate('manga');
        if (!capitulo) return res.status(404).json({ message: 'Capítulo não encontrado' });
        res.json(capitulo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Atualizar capítulo
router.put('/:id', async (req, res) => {
    try {
        const capituloAtualizado = await Capitulos.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!capituloAtualizado) return res.status(404).json({ message: 'Capítulo não encontrado' });
        res.json(capituloAtualizado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Deletar capítulo
router.delete('/:id', async (req, res) => {
    try {
        const capituloDeletado = await Capitulos.findByIdAndDelete(req.params.id);
        if (!capituloDeletado) return res.status(404).json({ message: 'Capítulo não encontrado' });
        res.json({ message: 'Capítulo deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
