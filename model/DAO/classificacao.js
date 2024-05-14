const {PrismaClient} = require('@prisma/client') 
const prisma = new PrismaClient()

const insertCLassificacao = async function(dadosClassificacao){
    try {

        let sql = `insert into tbl_classificacao(
            faixa_etaria,
            classificacao,
            caracteristicas,
            foto_classificacao
        )values(
            '${dadosClassificacao.faixa_etaria}',
            '${dadosClassificacao.classificacao}',
            '${dadosClassificacao.caracteristicas}',
            '${dadosClassificacao.foto_classificacao}'
        )`

        let rsClassificacao = await prisma.$executeRawUnsafe(sql)
        if(rsClassificacao){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const selectAllClassificacoes = async function(){
    try {
        let sql = 'select * from tbl_classificacao'
        let rsClassificacao = await prisma.$queryRawUnsafe(sql)
        return rsClassificacao       
    } catch (error) {
        return false
    }
}


const selectByIdClassificacao = async function(id){
    try {

        let sql = `select * from tbl_classificacao where id = ${id}`
        let rsClassificacao = await prisma.$queryRawUnsafe(sql)

        if(rsClassificacao){
            return rsClassificacao
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const deleteClassificacao = async function(id){
    try {

        let sql = `delete from tbl_classificacao where id = ${id}`
        const rsClassificacao = await prisma.$executeRawUnsafe(sql)
        if(rsClassificacao){
            return rsClassificacao
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const updateClassificacao = async function(dadosClassificacao){
    try {

        let sql = 
        ` update tbl_classificacao
                       set
                       faixa_etaria = '${dadosClassificacao.faixa_etaria}',
                       classificacao = '${dadosClassificacao.classificacao}',
                       caracteristicas = '${dadosClassificacao.caracteristicas}',
                       foto_classificacao = '${dadosClassificacao.foto_classificacao}'
                       
                       where id = ${dadosClassificacao.id} `

        
        let rsClassificacao = await prisma.$executeRawUnsafe(sql)
        if(rsClassificacao){
            return rsClassificacao
        }
        else{
            return false
        }
        
    } catch (error) {
        return false
    }

}

const selectIdLastClassificacao = async function(){
    try {
        let sql = `select cast(last_insert_id() as decimal) as id from tbl_classificacao limit 1`

        let rsId = await prisma.$queryRawUnsafe(sql)
        if(rsId){
            return rsId
        }
        else{
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllClassificacoes,
    selectByIdClassificacao,
    insertCLassificacao,
    deleteClassificacao,
    updateClassificacao,
    selectIdLastClassificacao
}