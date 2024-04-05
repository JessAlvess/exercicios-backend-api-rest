const express = require('express')
const rotas = express()
rotas.use(express.json())
const livros = require('./controladores/livros')

rotas.get('/livros', livros.listarLivros)
rotas.post('/livros', livros.cadastrarLivro)
rotas.delete('/livros/:id', livros.excluirLivro)
rotas.get('/livros/:id', livros.consultarLivro)
rotas.put('/livros/:id', livros.alterarLivro)
rotas.patch('/livros/:id', livros.atualizarLivro)

module.exports = rotas