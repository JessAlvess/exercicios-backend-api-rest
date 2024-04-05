let bancodedados = require('../dados/bancodedados')

const listarLivros = (req, res) => {
    return res.json(bancodedados.livros)
}

const consultarLivro = (req, res) => {
    const { id } = req.params

    if (isNaN(Number(id))) {
        return res.json({
            "mensagem": "O valor do parâmetro ID da URL não é um número válido."
          })
    }

    const livro = bancodedados.livros.find((livro) => {
        return livro.id === Number(id)
    })

    if (!livro) {
        return res.json({
            "mensagem": "Não existe livro para o ID informado."
          })
    }

    return res.json(livro)

}

const cadastrarLivro = (req, res) => {
    const { titulo, autor, ano, numPaginas } = req.body

    const novoLivro = {
        id: bancodedados.idLivro++,
        titulo,
        autor,
        ano,
        numPaginas
    }
    bancodedados.livros.push(novoLivro)
    return res.status(201).json()
}

const excluirLivro = (req, res) => {
    const { id } = req.params

    const livroExcluido = bancodedados.livros.find(livro => livro.id === Number(id))

    if (!livroExcluido) {
        return res.json({
            "mensagem": "Não existe livro a ser removido para o ID informado."
          })
    } else {
        bancodedados.livros = bancodedados.livros.filter((livro) => {
            return livro !== livroExcluido
        })
        return res.json({
            "mensagem": "Livro removido."
          })
    }
}

const alterarLivro = (req, res) => {
    const { id } = req.params
    const { titulo, autor, ano, numPaginas } = req.body
    const novoLivro = {
        id: Number(id),
        titulo,
        autor,
        ano,
        numPaginas
    }
    const indexLivro = bancodedados.livros.findIndex((livro) => {
        return livro.id === Number(id)
    })

    if (indexLivro === -1)  {
        return res.json({
            "mensagem": "Não existe livro a ser substituído para o ID informado."
          }) 
    }
    bancodedados.livros[indexLivro] = novoLivro
    return res.json({
        "mensagem": "Livro substituído."
      })
}

const atualizarLivro = (req, res) => {
    const { id } = req.params
    const { titulo, autor, ano, numPaginas } = req.body

    const indexLivro = bancodedados.livros.findIndex((livro) => {
        return livro.id === Number(id)
    })

    if (indexLivro === -1)  {
        return res.json({
            "mensagem": "Não existe livro a ser alterado para o ID informado."
          }) 
    }
    let novoLivro = 
    bancodedados.livros[indexLivro]
    
    if (titulo) {
        novoLivro.titulo = String(titulo)
    } 
    if (autor){
        novoLivro.autor = String(autor)
    } 
    if (ano) {
        novoLivro.ano = Number(ano)
    }
    if (numPaginas) {
        novoLivro.numPaginas = Number(numPaginas)
    }
    bancodedados.livros[indexLivro] = novoLivro
    return res.json({
        "mensagem": "Livro alterado."
      })

}

module.exports = {
    listarLivros,
    consultarLivro,
    cadastrarLivro,
    excluirLivro,
    alterarLivro,
    atualizarLivro
}