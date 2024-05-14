const message = require('../modulo/config.js')
const classificacaoDAO = require('../model/DAO/classificacao.js')

const getAllClassificacoes = async function () {
    
    const classificacoesJson = {}
    let dadosClassificacacoes = await classificacaoDAO.selectAllClassificacoes()

    if (dadosClassificacacoes) {
        if (dadosClassificacacoes.length > 0) {
            classificacoesJson.classificacoes = dadosClassificacacoes
            classificacoesJson.quantidade = dadosClassificacacoes.length
            classificacoesJson.status_code = 200

            return classificacoesJson
        } else {
            return message.ERROR_NOT_FOUND 
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB 

    }
}

const getBuscarClassificacao = async function (id) {

    let idClassificacao = id
    let classificacaoJSON = {}

    if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)) {
        return message.ERROR_INVALID_ID 
    } else {
        let dadosClassificacao = await classificacaoDAO.selectByIdClassificacao(idClassificacao)
        if (dadosClassificacao) {
            if (dadosClassificacao.length > 0) {
                classificacaoJSON.classificacao = dadosClassificacao
                classificacaoJSON.status_code = 200

                return classificacaoJSON
            } else {
                return message.ERROR_NOT_FOUND 
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB 
        }
    }

}

const setInserirNovaClassificacao = async function (dadosClassificacao, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            let novaClassificacaoJson = {}
            if (
                dadosClassificacao.faixa_etaria == '' || dadosClassificacao.classificacao == '' || dadosClassificacao.caracteristicas == ''                      || dadosClassificacao.foto_classificacao == ''        ||
                dadosClassificacao.faixa_etaria == null || dadosClassificacao.classificacao == null || dadosClassificacao.caracteristicas == null                || dadosClassificacao.foto_classificacao == null      ||
                dadosClassificacao.faixa_etaria == undefined || dadosClassificacao.classificacao == undefined || dadosClassificacao.caracteristicas == undefined || dadosClassificacao.foto_classificacao == undefined ||
                dadosClassificacao.faixa_etaria.length > 5 || dadosClassificacao.classificacao.length > 7 || dadosClassificacao.caracteristicas.length > 10000   || dadosClassificacao.foto_classificacao.length > 300
            ) {
                return message.ERROR_REQUIRED_FIELDS 
            } else {
                let novaClassificacao = await classificacaoDAO.insertCLassificacao(dadosClassificacao)
                let novoId = await classificacaoDAO.selectIdLastClassificacao()

                if (novaClassificacao) {
                    novaClassificacaoJson.id = Number(novoId[0].id)
                    novaClassificacaoJson.classificacao = dadosClassificacao
                    novaClassificacaoJson.status_code = message.SUCESS_CREATED_ITEM.status_code
                    novaClassificacaoJson.status = message.SUCESS_CREATED_ITEM.message

                    return novaClassificacaoJson 
                }else{
                    return message.ERROR_INTERNAL_SERVER_DB 
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE 
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER 
    }

}

const setDeletarClassificacao = async function (id) {

    let idClassificacao = id
    let validarId = await classificacaoDAO.selectByIdClassificacao(idClassificacao)
    if (validarId.length > 0) {
        if (idClassificacao == null || idClassificacao == '' || idClassificacao == undefined){
            return message.ERROR_INVALID_ID 
        }
        else{
            let dadosClassificacao = await classificacaoDAO.deleteClassificacao(idClassificacao)

            if(dadosClassificacao){
                return message.SUCESS_DELETE_ITEM
            }
            else{
                return message.ERROR_INTERNAL_SERVER_DB 
            }
        }
    } 
    else {
        return message.ERROR_NOT_FOUND 
    }
}

const setAtualizarCLassificacao = async function(id, dadosClassificacao, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            let idLocal = id
            
            const validarId = await classificacaoDAO.selectByIdClassificacao(idLocal)
            if(validarId.length > 0){
            let novaClassificacaoJson = {}
            if (
                dadosClassificacao.faixa_etaria == '' || dadosClassificacao.classificacao == '' || dadosClassificacao.caracteristicas == ''                      || dadosClassificacao.foto_classificacao == ''        ||
                dadosClassificacao.faixa_etaria == null || dadosClassificacao.classificacao == null || dadosClassificacao.caracteristicas == null                || dadosClassificacao.foto_classificacao == null      ||
                dadosClassificacao.faixa_etaria == undefined || dadosClassificacao.classificacao == undefined || dadosClassificacao.caracteristicas == undefined || dadosClassificacao.foto_classificacao == undefined ||
                dadosClassificacao.faixa_etaria.length > 5 || dadosClassificacao.classificacao.length > 7 || dadosClassificacao.caracteristicas.length > 10000   || dadosClassificacao.foto_classificacao.length > 300
            ) {
                return message.ERROR_REQUIRED_FIELDS 
            }
            else{
                dadosClassificacao.id = idLocal
                let atualizaClassificacao = await classificacaoDAO.updateClassificacao(dadosClassificacao)
                if(atualizaClassificacao){
                    novaClassificacaoJson.classificacao = dadosClassificacao
                    novaClassificacaoJson.status = message.SUCCESS_UPDATED_ITEM
                    novaClassificacaoJson.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    novaClassificacaoJson.message = message.SUCCESS_UPDATED_ITEM.message

                    return novaClassificacaoJson
                }else{
                    return message.ERROR_INTERNAL_SERVER_DB 
                }

            }
        }else{
            return message.ERROR_NOT_FOUND 
        }
        }else{
            return message.ERROR_CONTENT_TYPE 
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }

}


module.exports = {
    getAllClassificacoes,
    getBuscarClassificacao,
    setInserirNovaClassificacao,
    setDeletarClassificacao,
    setAtualizarCLassificacao
}