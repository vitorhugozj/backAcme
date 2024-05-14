/****************************************
 * Objetivo: fazer as consultas no json
 *****************************************/

var dadosFilmes = require('../modulo/filmes.js')

const getListaFilmes = () => {
    const filmes = dadosFilmes.filmes.filmes

    let jsonFilmes = {}
    let arrayFilmes = []

    filmes.forEach((filme) => {
        let jsonFilmes = {
            id: filme.id,
            nome: filme.nome,
        }

        arrayFilmes.push(jsonFilmes)
    })

    jsonFilmes.filmes = arrayFilmes

    return jsonFilmes

}

const getFilme = (idFilme) => {

    const filmes = dadosFilmes.filmes.filmes

    let jsonFilmes = {}
    let id = idFilme,
        situacao = false

    filmes.forEach((filme) => {
        if (filme.id == id) {
            jsonFilmes = {
                id: filme.id,
                nome: filme.nome,
            }
            situacao = true
        }
    })

    if (situacao) return jsonFilmes
    else return false

}

module.exports = {
    getListaFilmes,
    getFilme
}