/*****************************************************************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD no banco de dados MySql
 ****************************************************************************************************/

const { PrismaClient } = require('@prisma/client')
const { ERROR_INTERNAL_SERVER_DB } = require('../../modulo/config')

/**
 * $queryRawUnsafe(sql) --encaminha uma variavel
 * $queryRaw('select * from tbl_filme') -- encaminha o script direto
 */

const prisma = new PrismaClient()

const insertFilme = async function(dadosFilme) {

    try {
        let sql

        if (dadosFilme.data_relancamento == null ||
            dadosFilme.data_relancamento == undefined ||
            dadosFilme.data_relancamento == '') {
            sql = `insert into tbl_filme (nome, 
                                        sinopse,
                                        duracao,
                                        data_lancamento,
                                        data_relancamento,
                                        foto_capa,
                                        valor_unitario
        ) values(
            '${dadosFilme.nome}',
            '${dadosFilme.sinopse}',
            '${dadosFilme.duracao}',
            '${dadosFilme.data_lancamento}',
            null,
            '${dadosFilme.foto_capa}',
            '${dadosFilme.valor_unitario}'
        )`
        } else {
            sql = `insert into tbl_filme (nome, 
                                          sinopse,
                                          duracao,
                                          data_lancamento,
                                          data_relancamento,
                                          foto_capa,
                                          valor_unitario
                                    ) values(
                                    '${dadosFilme.nome}',
                                    '${dadosFilme.sinopse}',
                                    '${dadosFilme.duracao}',
                                    '${dadosFilme.data_lancamento}',
                                    null,
                                    '${dadosFilme.foto_capa}',
                                    '${dadosFilme.valor_unitario}'
                                    )`
        }

        let result = await prisma.$executeRawUnsafe(sql)
        
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}

const getId = async function() {
    try {
        const sqlGet = 'select cast(id as decimal) as id from tbl_filme order by id desc limit 1'

        let resultGet = await prisma.$queryRawUnsafe(sqlGet)

        if (resultGet) {
            return resultGet
        } else {
            return false
        }
    } catch (error) {
        return ERROR_INTERNAL_SERVER_DB
    }
}

const updateFilme = async function(id, novosDados) {
    try {
        let sql = `UPDATE tbl_filme SET `
        const keys = Object.keys(novosDados)

        keys.forEach((key, index) => {
            sql += `${key} = '${novosDados[key]}'`
            if (index !== keys.length - 1) {
                sql += `, `
            }
        })

        sql += ` WHERE id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        return result
    } catch (error) {
        return ERROR_INTERNAL_SERVER_DB
    }
}

const deleteFilme = async function() {

}

const selectAllFilmes = async function() {
    try {
        let sql = 'select * from tbl_filme'

        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes
    } catch (error) {
        return false
    }

}

const selectFilmeById = async function(id) {

    try {
        let sql = `select * from tbl_filme where id=${id}`

        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme
    } catch (error) {
        return false
    }
}

const selectFilmeByName = async function(name) {
    try {
        let sql = `select * from tbl_filme where nome like "%${name}%"`

        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme
    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectFilmeById,
    selectFilmeByName,
    getId
}