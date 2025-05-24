const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Manga = require('../model/Manga'); // ajuste o caminho conforme seu projeto

// Schema de validação com Joi
const mangaSchema = Joi.object({
    titulo: Joi.string().required(),
    descricao: Joi.string().allow(''),
    autor: Joi.string().allow(''),
    generos: Joi.array().items(Joi.string()),
    imagemCapa: Joi.string().uri().allow(''),
    criadoPor: Joi.string().hex().length(24),
    scan: Joi.string().hex().length(24)
});

// Rota POST para criar manga com validação
router.post('/', async (req, res) => {
    const { error } = mangaSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const novoManga = new Manga(req.body);
        const salvoManga = await novoManga.save();
        res.status(201).json(salvoManga);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
