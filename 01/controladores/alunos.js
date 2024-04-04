const alunos = require('../dados/bancodedados')

const listarAlunos = (req, res) => {
    return res.json(alunos)
}

const vizualizarAluno = (req, res) => {
    const { id } = req.params
    
    if (isNaN(Number(id))) {
        return res.status(400).json({
            "mensagem": "O ID deve ser um número válido"
        })
    }

    const aluno = alunos.find((aluno) => {
        return aluno.id === Number(id)
    })

    if (!aluno) {
        return res.status(404).json({
            "mensagem": "O aluno não foi encontrado."
        })
    }

    return res.status(200).json(aluno)
}


module.exports = {
    listarAlunos,
    vizualizarAluno
}