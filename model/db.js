const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schema do Usuário
const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, // select: false para não retornar senha por padrão
    role: { type: String, enum: ['scan', 'user'], default: 'user' },
    mangasLidos: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    experiencia: { type: Number, default: 0 },
    rankSemana: { type: Number, default: 0 },
    ultimaLeitura: { type: Date },
    ultimoAcesso: { type: Date },
    capituloslidos: [{
        manga: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga' },
        capitulo: { type: mongoose.Schema.Types.ObjectId, ref: 'Capitulo' },
        dataLeitura: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

// Middleware para hash da senha
usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Metodo para comparar senha
usuarioSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

// Schema do Manga (se necessário)
const mangaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    descricao: String,
    capa: String,
    status: {
        type: String,
        enum: ['em andamento', 'completo', 'dropado'],
        default: 'em andamento'
    }
}, { timestamps: true });

// Schema do Capítulo (se necessário)
const capituloSchema = new mongoose.Schema({
    numero: { type: Number, required: true },
    titulo: String,
    manga: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manga',
        required: true
    },
    paginas: [String]
}, { timestamps: true });

// Exportar modelos
const Usuario = mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);
const Manga = mongoose.models.Manga || mongoose.model('Manga', mangaSchema);
const Capitulo = mongoose.models.Capitulo || mongoose.model('Capitulo', capituloSchema);

module.exports = {
    Usuario,
    Manga,
    Capitulo
};