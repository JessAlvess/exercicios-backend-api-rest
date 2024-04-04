let bancodedados = require('../dados/bancodedados')

const listarConvidados = (req, res) => {
    const { nome } = req.query
    
    if (!nome || String(nome) === '') {
        return res.json(bancodedados.convidados)
    } else {
        const convidado = bancodedados.convidados.find((convidado) => {
            return convidado === String(nome)
        })

        if (!convidado) {
            return res.json({
                "mensagem": "O convidado buscado não está presente na lista."
              })
        }

        return res.json({
            "mensagem": "Convidado presente."
          })
    }  
}

const cadastrarConvidado = (req, res) => {
    const { nome } = req.body
    
    const convidado = bancodedados.convidados.find((convidado) => {
        return convidado === String(nome)
    })

    if (convidado) {
        return res.json({
            "mensagem": "O nome do convidado a ser adicionado já existe na lista. Caso queria adicionar outro convidado de mesmo nome, favor fornecer o sobrenome também."
        })
    }

    const novoConvidado = nome
    bancodedados.convidados.push(novoConvidado)
    return res.json({
        "mensagem": "Convidado adicionado."
    })
}

const excluirConvidado = (req, res) => {
    const { nome } = req.params

    const convidadoExcluido = bancodedados.convidados.find(convidado => convidado === String(nome))

    if (!convidadoExcluido) {
        return res.json({
            "mensagem": "O nome do convidado a ser removido não existe na lista. Nenhum convidado foi removido."
        })
    } else {
        bancodedados.convidados = bancodedados.convidados.filter((convidado) => {
            return convidado !== convidadoExcluido
        })
        return res.json({
            "mensagem": "Convidado removido."
        })
    }
}

module.exports = {
    listarConvidados,
    cadastrarConvidado,
    excluirConvidado
}