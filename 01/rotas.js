const express = require('express')
const rotas = express()
rotas.use(express.json())
const alunos = require('./controladores/alunos')

rotas.get('/alunos', alunos.listarAlunos)
rotas.get('/alunos/:id', alunos.vizualizarAluno)
rotas.post('/alunos', alunos.cadastrarAluno)
rotas.delete('/alunos/:id', alunos.excluirAluno)

module.exports = rotas