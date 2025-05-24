const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../model/Usuario'); // corrigido: nome maiúsculo

const JWT_SECRET = process.env.JWT_SECRET || 'secretdesenvolvimento';

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verificar se já existe usuário
        const existingUser = await Usuario.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: 'Usuário já existe' });

        // Criptografar senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Criar novo usuário
        const newUser = new Usuario({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ msg: 'Usuário criado com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Erro no servidor' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar usuário
        const user = await Usuario.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Usuário não encontrado' });

        // Validar senha
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Senha incorreta' });

        // Criar token JWT
        const token = jwt.sign(
            { id: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Erro no servidor' });
    }
});

module.exports = router;
