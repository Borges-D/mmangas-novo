
const express = require('express');
const router = express.Router();
const { Usuario } = require('../model/db');

// Rota de registro
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validação básica
        if (!username || !email || !password) {
            return res.status(400).json({
                msg: 'Por favor, preencha todos os campos obrigatórios'
            });
        }

        // Verificar se já existe usuário com mesmo email ou username
        const existingUser = await Usuario.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({
                msg: existingUser.email === email ?
                    'Email já cadastrado' :
                    'Nome de usuário já está em uso'
            });
        }

        // Criar novo usuário
        const newUser = new Usuario({
            username,
            email,
            password,
            mangasLidos: 0,
            level: 1,
            experiencia: 0,
            rankSemana: 0,
            capituloslidos: []
        });

        await newUser.save();

        res.status(201).json({
            msg: 'Usuário criado com sucesso',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                mangasLidos: newUser.mangasLidos,
                level: newUser.level
            }
        });

    } catch (err) {
        console.error('Erro no registro:', err);
        res.status(500).json({
            msg: 'Erro ao criar usuário',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

// Rota de login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validação básica
        if (!email || !password) {
            return res.status(400).json({
                msg: 'Por favor, forneça email e senha'
            });
        }

        // Buscar usuário
        const user = await Usuario.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Usuário não encontrado'
            });
        }

        // Atualizar último acesso
        user.ultimoAcesso = new Date();
        await user.save();

        res.json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                mangasLidos: user.mangasLidos,
                level: user.level
            }
        });

    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({
            msg: 'Erro ao realizar login',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

// Rota para verificar status do usuário
router.get('/status/:id', async (req, res) => {
    try {
        const user = await Usuario.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                msg: 'Usuário não encontrado'
            });
        }

        res.json({
            user: {
                id: user._id,
                username: user.username,
                mangasLidos: user.mangasLidos,
                level: user.level,
                experiencia: user.experiencia,
                rankSemana: user.rankSemana
            }
        });
    } catch (err) {
        res.status(500).json({
            msg: 'Erro ao buscar status do usuário',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

module.exports = router;