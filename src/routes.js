const express = require('express')
const routes = express.Router()
const Usuario = require('./controllers/usuario.controller')
const Post = require('./controllers/post.controllers')

routes.get('/', (req, res) => {
    res.send('Página Inicial')
})

// CRUD Usuários
routes.get('/api/usuarios', Usuario.index)
routes.get('/api/usuarios/:email', Usuario.getId)
routes.post('/api/usuarios', Usuario.create)
routes.delete('/api/usuarios/:_id', Usuario.delete)
routes.put('/api/usuarios', Usuario.update)
routes.post('/api/usuarios/login', Usuario.login)

// Crud Posts
routes.get('/api/posts', Post.index)
routes.get('/api/posts.details/:_id', Post.details)
routes.post('/api/posts', Post.create)
routes.delete('/api/posts/:_id', Post.delete)
routes.put('/api/posts', Post.update)


module.exports = routes