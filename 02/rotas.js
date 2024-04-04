const express = require('express')
const rotas = express()
rotas.use(express.json())
const convidados = require('./controladores/convidados')

rotas.get('/convidados', convidados.listarConvidados)
rotas.post('/convidados', convidados.cadastrarConvidado)
rotas.delete('/convidados/:nome', convidados.excluirConvidado)

module.exports = rotas