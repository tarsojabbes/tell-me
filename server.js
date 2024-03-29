const express = require('express')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express()
const routes = require('./src/routes')
const PORT = process.env.PORT || 5000

app.use(cors())

mongoose.connect(process.env.MONGO_URL, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(">> MongoDB conectado com sucesso")
})


app.use(cookieParser())
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
    console.log('>> Servidor está rodando')
})
