let bancodedados = require('../dados/bancodedados')

const listarAlunos = (req, res) => {
    return res.json(bancodedados.alunos)
}

const vizualizarAluno = (req, res) => {
    const { id } = req.params
    
    if (isNaN(Number(id))) {
        return res.status(400).json({
            "mensagem": "O ID deve ser um número válido"
        })
    }

    const aluno = bancodedados.alunos.find((aluno) => {
        return aluno.id === Number(id)
    })

    if (!aluno) {
        return res.status(404).json({
            "mensagem": "O aluno não foi encontrado."
        })
    }

    return res.status(200).json(aluno)
}

const cadastrarAluno = (req, res) => {
    const { nome, sobrenome, idade, curso } = req.body
    let id = 1
    const testString = (str) => {
        return String(str).trim() === ''
    }

    if (!nome || !sobrenome || !idade || !curso) {
        return res.status(400).json({
            "mensagem": "Todas as informações devem ser preenchidas."
        })
    }

    if (testString(nome) || testString(sobrenome) || testString(curso)) {
        return res.status(400).json({
            "mensagem": "As informações não devem ser vazias."
        })
    }

    if (idade < 18) {
        return res.status(400).json({
            "mensagem": "O aluno tem menos de 18 anos."
        })
    }
    const novoAluno = {
        id: bancodedados.idAluno++,
        nome,
        sobrenome,
        idade,
        curso
    }
    bancodedados.alunos.push(novoAluno)
    return res.status(201).send()
}

const excluirAluno = (req, res) => {
    const { id } = req.params

    if (isNaN(Number(id))) {
        return res.status(400).json({
            "mensagem": "O ID do aluno deve ser um número."
        })
    }

    const alunoExcluido = bancodedados.alunos.find((aluno) => {
        return aluno.id === Number(id)
    })

    if (!alunoExcluido) {
        return res.status(404).json({
            "mensagem": "Não existe aluno com este ID."
        })
    } else {
        bancodedados.alunos = bancodedados.alunos.filter((aluno) => {
            return aluno !== alunoExcluido
        })
        return res.status(200).send(alunoExcluido)
    }
}

module.exports = {
    listarAlunos,
    vizualizarAluno,
    cadastrarAluno,
    excluirAluno
}