const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const DataSchema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String,
    profissao: String,
}, {
    timestamps: true
})

DataSchema.pre('save', async function (next) {
    if (!this.isModified("senha")) {
        return next()
    }
    this.senha = await bcrypt.hashSync(this.senha, 10)
    next()
})

DataSchema.pre('findOneAndUpdate', async function (next) {
    var password = this.getUpdate().senha + ""
    if (password.length < 55) {
        this.getUpdate().senha = bcrypt.hashSync(password, 10)
    }
    next()
})

DataSchema.pre('findOneAndUpdate', async function (next) {
    var password = this.getUpdate().senha_usuario + ""
    if (password.length < 55) {
        this.getUpdate().senha_usuario = bcrypt.hashSync(password, 10)
    }
    next()
})

DataSchema.methods.isCorrectPassword = function (password, callback) {
    var senha = this.senha
    bcrypt.compare(password, senha, function (err, same) {
        if (err) {
            callback(err)
        } else {
            callback(err, same)
        }
    })
}

const usuarios = mongoose.model("Usuarios", DataSchema)
module.exports = usuarios
