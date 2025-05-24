const Manga = require('../models/manga');

// Criar um novo mangá
exports.criarManga = async (req, res) => {
    try {
        const novoManga = await Manga.create(req.body);
        res.status(201).json(novoManga);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

// Listar todos os mangás
exports.listarMangas = async (req, res) => {
    try {
        const mangas = await Manga.find().populate('scan').populate('criadoPor');
        res.json(mangas);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

// Buscar mangá por ID
exports.buscarManga = async (req, res) => {
    try {
        const manga = await Manga.findById(req.params.id).populate('scan').populate('criadoPor');
        if (!manga) return res.status(404).json({ erro: 'Mangá não encontrado' });
        res.json(manga);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

// Atualizar mangá
exports.atualizarManga = async (req, res) => {
    try {
        const mangaAtualizado = await Manga.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!mangaAtualizado) return res.status(404).json({ erro: 'Mangá não encontrado' });
        res.json(mangaAtualizado);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

// Deletar mangá
exports.deletarManga = async (req, res) => {
    try {
        const deletado = await Manga.findByIdAndDelete(req.params.id);
        if (!deletado) return res.status(404).json({ erro: 'Mangá não encontrado' });
        res.json({ mensagem: 'Mangá deletado com sucesso' });
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};
