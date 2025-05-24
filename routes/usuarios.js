const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['scan', 'user'], default: 'user' },
    // Campos para ranking
    mangasLidos: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    experiencia: { type: Number, default: 0 },
    rankSemana: { type: Number, default: 0 },
    ultimaLeitura: { type: Date },
    capituloslidos: [{
        manga: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga' },
        capitulo: { type: mongoose.Schema.Types.ObjectId, ref: 'Capitulo' },
        dataLeitura: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

// Mantenha os métodos existentes
usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

usuarioSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

//
usuarioSchema.methods.atualizarMangasLidos = async function() {
    const mangasUnicos = [...new Set(this.capituloslidos.map(c => c.manga.toString()))];
    this.mangasLidos = mangasUnicos.length;
    await this.save();
};

module.exports = mongoose.model('Usuario', usuarioSchema);