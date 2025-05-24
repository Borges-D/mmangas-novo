const express = require('express');
const router = express.Router();
const Usuario = require('../model/Usuario');

// Criar usuário
router.post('/', async (req, res) => {
    try {
        const novoUsuario = new Usuario(req.body);
        const salvoUsuario = await novoUsuario.save();
        res.status(201).json(salvoUsuario);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Listar todos usuários
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Buscar usuário por id
router.get('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Atualizar usuário
router.put('/:id', async (req, res) => {
    try {
        const usuarioAtualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!usuarioAtualizado) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json(usuarioAtualizado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Deletar usuário
router.delete('/:id', async (req, res) => {
    try {
        const usuarioDeletado = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuarioDeletado) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
