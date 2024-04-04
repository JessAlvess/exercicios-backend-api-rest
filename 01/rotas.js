const express = require('express')
const rotas = express()
const aluno = require('./controladores/alunos')

rotas.get('/alunos', aluno.listarAlunos)
rotas.get('/alunos/:id', aluno.vizualizarAluno)

module.exports = rotas