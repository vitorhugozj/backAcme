const generoDAO = require('../model/DAO/generos.js')
const message = require('../modulo/config.js')

const getListarGeneros = async() => {
    let generosJSON = {}

    let dadosGeneros = await generoDAO.selectAllGeneros()

    if(dadosGeneros){
        if(dadosGeneros.length > 0){
            
            generosJSON.generos = dadosGeneros
            generosJSON.quantidade = dadosGeneros.length
            generosJSON.status_code = 200

            return generosJSON
        }else{
            return message.ERROR_NOT_FOUND
        }
    }else{
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const getBuscarGenero = async(id) => {
    try {
    let idGenero = id
    let generoJSON = {}

    if(idGenero == '' || idGenero == undefined || isNaN(idGenero)){
        return message.ERROR_INVALID_ID //400
    }else{
        let dadosGenero = await generoDAO.selectGeneroById(idGenero)
        if(dadosGenero){

            if(dadosGenero.length > 0){

                generoJSON.filme = dadosGenero
                generoJSON.status_code = 200

                return generoJSON
            }else{
                return message.ERROR_NOT_FOUND
            }

        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setInserirNovoGenero = async(dadosGenero, contentType) => {
    try{
        if(String(contentType).toLowerCase() == 'application/json'){
            let novoGeneroJSON = {}

            if(dadosGenero.nome == ''                     || dadosGenero.nome == undefined            || dadosGenero.nome == null            || dadosGenero.nome.length > 45       ||
            dadosGenero.descricao == ''                  || dadosGenero.descricao == undefined         || dadosGenero.descricao == null         || dadosGenero.descricao.length > 255 
            ){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                    let novoGenero = await generoDAO.insertGenero(dadosGenero)
                    if(novoGenero){

                        let idDAO = await generoDAO.selectLastIdGenero()

                        console.log(idDAO)
                        dadosGenero.id = idDAO[0].id

                        novoGeneroJSON.genero = dadosGenero
                        novoGeneroJSON.status = message.SUCESS_CREATED_ITEM.status
                        novoGeneroJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                        novoGeneroJSON.message = message.SUCESS_CREATED_ITEM.message

                        return novoGeneroJSON 
                    }else{
                        return message.ERROR_INTERNAL_SERVER_DB 
                    }
                }
        }else{
            return message.ERROR_UNSUPORTED_CONTENT_TYPE 
        }
    }catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarGenero = async(id, dadosGenero, contentType) => {
    try {
        let idGenero = id
        if(String(contentType).toLowerCase() == 'application/json'){
            if(idGenero == '' || idGenero == null || idGenero == undefined || isNaN(idGenero)){
                return message.ERROR_INVALID_ID
            }else{
                let generoAtt = {}

                if(dadosGenero.nome == ''                     || dadosGenero.nome == undefined            || dadosGenero.nome == null            || dadosGenero.nome.length > 45       ||
                dadosGenero.descricao == ''                  || dadosGenero.descricao == undefined         || dadosGenero.descricao == null         || dadosGenero.descricao.length > 255 
                ){
                    return message.ERROR_INVALID_REQUIRED_FIELDS
                }else{
                    let idVerify = await generoDAO.selectGeneroById(idGenero)

                    if(idVerify.length > 0){
                        let att = await generoDAO.updateGenero(id, dadosGenero)
    
                        if(att){
                            generoAtt.genero = dadosGenero
                            generoAtt.status = message.SUCESS_UPTADE_ITEM.status
                            generoAtt.status_code = message.SUCESS_UPTADE_ITEM.status_code
                            generoAtt.message = message.SUCESS_UPTADE_ITEM.message

                            return generoAtt
                        }else{
                            return message.ERROR_INTERNAL_SERVER_DB
                        }
                    }else{
                        return message.ERROR_NOT_FOUND
                    }
                }
            }
        }else{
            return message.ERROR_UNSUPORTED_CONTENT_TYPE 
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setExcluirGenero = async(id) => {
    try {
        let idGenero = id
        if(idGenero == '' || idGenero == null || idGenero == undefined || isNaN(idGenero)){
            return message.ERROR_INVALID_ID
        }else{
            let idVerify = await generoDAO.selectGeneroById(idGenero)

            if(idVerify.length > 0){
                let deletado = await generoDAO.deleteGenero(idGenero)
     
                if(deletado){
                    return message.SUCESS_UPTADE_ITEM
                }else{
                    return message.ERROR_INTERNAL_SERVER_DB 
                }
            }else{
                return message.ERROR_NOT_FOUND 
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }

}

module.exports={
    getListarGeneros,
    getBuscarGenero,
    setInserirNovoGenero,
    setAtualizarGenero,
    setExcluirGenero
}