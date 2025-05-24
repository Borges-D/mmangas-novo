const express = require('express');
const router = express.Router();
const Manga = require('../model/Manga');
const Joi = require('joi');


// Schema Joi para validação do Manga
const mangaSchema = Joi.object({
    titulo: Joi.string().required(),
    slug: Joi.string().required(),
    descricao: Joi.string().allow(''),
    autor: Joi.string().allow(''),
    generos: Joi.array().items(Joi.string()),
    imagemCapa: Joi.string().uri().allow(''),
    criadoPor: Joi.string().hex().length(24).allow(null),
    scanSlug: Joi.string().required(),
    capitulos: Joi.array().items(
        Joi.object({
            numero: Joi.number(),
            titulo: Joi.string().allow(''),
            paginas: Joi.array().items(Joi.string().uri()),
            dataPublicacao: Joi.date()
        })
    ).optional()
});

// GET todos os mangas
router.get('/', async (req, res) => {
    try {
        const mangas = await Manga.find();
        res.json(mangas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET manga por slug
router.get('/:slug', async (req, res) => {
    try {
        const manga = await Manga.findOne({ slug: req.params.slug });
        if (!manga) return res.status(404).json({ error: 'Mangá não encontrado' });
        res.json(manga);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST criar novo manga
router.post('/', async (req, res) => {
    const { error } = mangaSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const existeSlug = await Manga.findOne({ slug: req.body.slug });
        if (existeSlug) return res.status(400).json({ error: 'Slug já existe' });

        const novoManga = new Manga(req.body);
        const salvo = await novoManga.save();
        res.status(201).json(salvo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT atualizar manga por slug
router.put('/:slug', async (req, res) => {
    const { error } = mangaSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const mangaAtualizado = await Manga.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true, runValidators: true }
        );
        if (!mangaAtualizado) return res.status(404).json({ error: 'Mangá não encontrado' });
        res.json(mangaAtualizado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE manga por slug
router.delete('/:slug', async (req, res) => {
    try {
        const mangaDeletado = await Manga.findOneAndDelete({ slug: req.params.slug });
        if (!mangaDeletado) return res.status(404).json({ error: 'Mangá não encontrado' });
        res.json({ message: 'Mangá deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
