/*****************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistencias e regras de negócio
 * para os filmes
 ****************************************************************************************************/

const filmesDAO = require('../model/DAO/filme.js')
const ERROR_Messages = require('../modulo/config.js')

const setNovoFilme = async function(dadosFilme, content) {

    try {
        if (String(content).toLowerCase() == 'application/json') {

            let statusValidate = false
            let novoFilmeJson = {}

            if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome == null || dadosFilme.nome.length > 80 ||
                dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.nome == null || dadosFilme.sinopse > 65000 ||
                dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao == null || dadosFilme.duracao > 9 ||
                dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
                dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa == null || dadosFilme.foto_capa.length > 200 ||
                dadosFilme.valor_unitario.length > 8 || isNaN(dadosFilme.valor_unitario)
            ) {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS
            } else {
                if (dadosFilme.data_relancamento != '' && dadosFilme.data_relancamento != null && dadosFilme.data_relancamento != undefined) {
                    if (dadosFilme.data_relancamento.length != 10) {
                        return ERROR_Messages.ERROR_REQUIRED_FIELDS
                    } else {
                        statusValidate = true
                    }
                } else {
                    statusValidate = true
                }
                if (statusValidate) {
                    let novoFilme = await filmesDAO.insertFilme(dadosFilme)

                    if (novoFilme) {

                        let idFilme = await filmesDAO.getId()
                        
                        novoFilmeJson.status = ERROR_Messages.SUCESS_CREATED_ITEM.status
                        novoFilmeJson.status_code = ERROR_Messages.SUCESS_CREATED_ITEM.status_code
                        novoFilmeJson.message = ERROR_Messages.SUCESS_CREATED_ITEM.message
                        novoFilmeJson.idNovoFilme = idFilme
                        novoFilmeJson.filme = dadosFilme

                        return novoFilmeJson
                    } else {
                        return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
                    }
                }
            }
        } else {
            return ERROR_Messages.ERROR_NOT_FOUND
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }

}
const setAtualizarFilme = async function(novosDados, content) {
    if (String(content).toLowerCase() == 'application/json') {
        try {
            const id = novosDados.id
            delete novosDados.id

            const filmeAtualizado = await filmesDAO.updateFilme(id, novosDados)
            if (filmeAtualizado) {
                return ERROR_Messages.SUCESS_UPTADE_ITEM
            } else {
                return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
            }
        } catch (error) {
            return ERROR_Messages.ERROR_UPDATE_ITEM
        }
    } else {
        return ERROR_Messages.ERROR_REQUIRED_FIELDS
    }
}

const setExcluirFilme = async function() {

}
const getListarFilmes = async function() {

    try {
        let listaFilmes;
        // Cria uma variavel do tipo json
        let filmesJSON = {};
    
        if ((listaFilmes)){
            return listaFilmes;
        }else{
        
        // Chama a função do DAO para buscar os dados do banco de dados
        let dadosFilmes = await filmesDAO.selectAllFilmes();
    
        
        // Verifica se existem dados retornados do DAO
        if(dadosFilmes){
            if(dadosFilmes.length > 0){
            // Montando a estrutura do JSOm
            filmesJSON.filmes = dadosFilmes;
            filmesJSON.quantidade = dadosFilmes.length;
            filmesJSON.status_code = 200;
            // Retorna o JSON montado
            return filmesJSON; // 200
            }else{
                return ERROR_Messages.ERROR_NOT_FOUND // 404
            }
            } else{
                return ERROR_Messages.ERROR_INTERNAL_SERVER_DB // 500
    
        }
    }
    } catch (error) {
        console.log(error)
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

const getBuscarFilme = async function(id) {

    try {

        let idFilme = id

        let filmeJson = {}

        if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
            return ERROR_Messages.ERROR_INVALID_ID
        } else {
            let dadosFilme = await filmesDAO.selectFilmeById(idFilme)

            if (dadosFilme) {

                if (dadosFilme.length > 0) {
                    filmeJson.filme = dadosFilme
                    filmeJson.status_code = 200

                    return filmeJson

                } else
                    return ERROR_Messages.ERROR_NOT_FOUND
            } else {
                return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

const getFilmeNome = async function(name) {

    try {
        let nomeFilme = name

        let filmeJson = {}

        if (nomeFilme == '' || nomeFilme == undefined) {
            return ERROR_Messages.ERROR_NOT_FOUND
        } else {
            let dadosFilme = await filmesDAO.selectFilmeByName(nomeFilme)

            if (dadosFilme) {

                if (dadosFilme.length > 0) {

                    filmeJson.filme = dadosFilme
                    filmeJson.status_code = 200

                    return filmeJson
                } else {
                    return ERROR_Messages.ERROR_NOT_FOUND
                }
            } else {
                return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    setNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme,
    getFilmeNome
}