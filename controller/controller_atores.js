const message = require('../modulo/config.js');
const sexualidadeDAO = require('../model/DAO/sexoUn.js');
const nacionalidadeDAO = require('../model/DAO/nacionalidades.js');
const modelAtor = require('../model/DAO/atores.js')

const getBuscarIdAtor = async function (id) {

    try {
        let atorId = id
        let atorJSON = {};

        if (atorId == '' || atorId == undefined || isNaN(atorId)) {
            return message.ERROR_INVALID_ID
        } else  {
            let dadosAtor = await modelAtor.selectAtoresById(atorId)
            if (dadosAtor) {
                if (dadosAtor.length > 0) {
                //    console.log(dadosAtor)
                    let sexoUnAtor = await sexualidadeDAO.selectSexoById(dadosAtor[0].tbl_sexo_id)
                    
                    // delete ator.tbl_sexo
                    dadosAtor[0].sexo =  sexoUnAtor
              
                    
                    for (let ator of dadosAtor) {
                        let nacionalidadeAtor = await nacionalidadeDAO.selectNacionalidadeAtorId(ator.id)
                        if (nacionalidadeAtor.lenght > 0) {
                            ator.nacionalidade = nacionalidadeAtor
                        }
                    }
                }
                atorJSON.ator = dadosAtor;
                atorJSON.status_code = 200;

                return atorJSON
            } else {
                return message.ERROR_NOT_FOUND
            };
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarAtorNome = async function (nome) {
    try {
        let nomeDoAtor = nome
        let atoresJSON = {};
        if (nomeDoAtor == '' || nomeDoAtor == undefined || !isNaN(nomeDoAtor))
            return message.ERROR_INVALID_ID
        else {
            let dadosAtor = await modelAtor.selectByNomeAtor(nomeDoAtor)
            if (dadosAtor) {
                if (dadosAtor.lenght > 0) {
                    for (let ator of dadosAtor) {
                        let sexoUnAtor = await modelAtor.selectByIdSexo(ator.id)
                        ator.sexo = sexoUnAtor
                    }
                    for (let ator of dadosAtor) {
                        let nacionalidadeAtor = await nacionalidadeDAO.selectNacionalidadeAtorId(ator.id)
                        if (nacionalidadeDAO.lenght > 0) {
                            ator.nacionalidade = nacionalidadeAtor
                        }
                    }

                    atoresJSON.atores = dadosAtor
                    atoresJSON.status_code = 200
                    return atoresJSON
                } else
                    return message.ERROR_NOT_FOUND
            } else
                return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getListarAtores = async function () {
    try {
        let atoresJSON = {};

        let dadosAtor = await modelAtor.selectAllAtores();
        if (dadosAtor) {
            if (dadosAtor) {
                for (let ator of dadosAtor) {   
                    let sexoUnAtor = await sexualidadeDAO.selectSexoById(id)
                    ator.sexo = sexoUnAtor
                }
                for (let ator of dadosAtor) {
                    let nacionalidadeAtor = await nacionalidadeDAO.selectNacionalidadeAtorId(ator.id)
                    if (nacionalidadeAtor.lenght > 0) {
                        ator.nacionalidade = nacionalidadeAtor
                    }
                }
                atoresJSON.atores = dadosAtor
                atoresJSON.quantidade = dadosAtor.lenght
                atoresJSON.status_code = 200

                return atoresJSON
            } else
                console.log(dadosAtor);
            return message.ERROR_NOT_FOUND
        } else
            return message.ERROR_INTERNAL_SERVER_DB
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const setInserirAtor = async function (dadosAtor, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let inserirNovoAtor = {}
            let latterId
            if (
                dadosAtor.nome == '' || dadosAtor.nome == undefined || dadosAtor.nome == null || dadosAtor.nome.length > 120 ||
                dadosAtor.data_nascimento == '' || dadosAtor.data_nascimento == undefined || dadosAtor.data_nascimento == null || dadosAtor.data_nascimento.length != 1 ||
                dadosAtor.biografia == '' || dadosAtor.biografia == undefined || dadosAtor.biografia == null || dadosAtor.biografia.length > 50000 ||
                dadosAtor.foto == '' || dadosAtor.foto == undefined || dadosAtor.foto == null || dadosAtor.foto.length > 200 ||
                dadosAtor.sexo[0].nome == '' || dadosAtor.sexo[0].nome == undefined || dadosAtor.sexo[0].nome == null || dadosAtor.sexo[0].nome.length > 20
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                let validarStatus = false
                if (dadosAtor.data_falecimento != null && dadosAtor.data_falecimento != '' && dadosAtor.data_falecimento != undefined) {
                    if (dadosAtor.data_falecimento.length != 1) {
                        return message.ERROR_REQUIRED_FIELDS
                    } else {
                        validarStatus = true
                    }
                } else {
                    validarStatus = true
                }
                if (validarStatus) {
                    let addAtor = await modelAtor.insertNovoAtor(dadosAtor)
                    if (addAtor) {

                        inserirNovoAtor.ator = dadosAtor
                        inserirNovoAtor.status = message.SUCESS_CREATED_ITEM.status
                        inserirNovoAtor.status_code = message.SUCESS_CREATED_ITEM.status_code
                        inserirNovoAtor.message = message.SUCESS_CREATED_ITEM.message

                        latterId = await modelAtor.selectLastId()
                        dadosAtor.id = latterId[0].id
                        return inserirNovoAtor
                    }
                    else {
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarAtor = async function (id, dadosAtor, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {
            let atorId = id

            if (atorId == '' || atorId == undefined || isNaN(atorId))
                return message.ERROR_INVALID_ID
            else {

                let ator = await modelAtor.selectAtoresById(atorId)
                if (ator) {
                    let atualizarAtorJSON = {}
                    let atualizarAtor = await modelAtor.atualizarAtor(atorId, dadosAtor)
                    if (atualizarAtor) {
                        atualizarAtorJSON.ator = dadosAtor
                        atualizarAtor.status = message.SUCESS_UPTADE_ITEM.status
                        atualizarAtor.status_code = message.SUCESS_UPTADE_ITEM.status_code
                        atualizarAtor.message = message.SUCESS_UPTADE_ITEM.message
                        return atualizarAtor
                    }
                    else {
                        return message.ERROR_NOT_FOUND
                    }
                }
                else {
                    return message.ERROR_NOT_FOUND
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setExcluirAtor = async function (id) {

    try {

        let atorId = id;

        if (atorId == '' || atorId == undefined || isNaN(id)) {
            return message.ERROR_INVALID_ID
        } else {
            let atorById = await modelAtor.selectAtoresById(id)

            if (atorById.length > 0) {
                let deletarAtor = await modelAtor.deletarAtor(id)

                if (deletarAtor) {
                    return message.SUCESS_DELETE_ITEM
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            } else {
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    getBuscarIdAtor,
    getBuscarAtorNome,
    getListarAtores,
    setInserirAtor,
    setAtualizarAtor,
    setExcluirAtor
}