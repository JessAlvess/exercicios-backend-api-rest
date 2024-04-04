const express = require('express')
const app = express()
const rotas = require('./rotas')
const validarSenha = require('./intermediarios')

app.use(validarSenha)
app.use(rotas)

app.listen(3000)