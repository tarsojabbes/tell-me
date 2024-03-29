const Post = require('../models/post.model')

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort({ createdAt: -1 })
        res.json(posts)
    },
    async details(req, res) {
        const { _id } = req.params
        const post = await Post.findOne({ _id })
        res.json(post)
    },
    async create(req, res) {
        const { titulo, conteudo, criador } = req.body

        let data = {}
        let post = await Post.findOne({ titulo })
        if (!post) {
            data = { titulo, conteudo, criador }
            post = await Post.create(data);
            return res.status(200).json(post)
        } else {
            return res.status(500).json(post)
        }
    },
    async delete(req, res) {
        const { _id } = req.params
        const post = await Post.findByIdAndDelete({ _id })
        return res.json({ "Post removido": post, status: 200 })
    },
    async update(req, res) {
        const { _id, titulo, conteudo, criador } = req.body
        const data = { _id, titulo, conteudo, criador }
        const post = await Post.findOneAndUpdate({ _id }, data, { new: true })
        return res.json({ "Post atualizado": post })
    },
    async getPostsByIdUsuario(req, res) {
        const { criador } = req.params
        const posts = await Post.find({ criador }).sort({ createdAt: -1 })
        res.json(posts)
    }
}