const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


const selectAllAtores = async function(){

    try {
        let sql = 'select * from tbl_ator order by id desc'; 
        let rsAtores = await prisma.$queryRawUnsafe(sql)

    if(rsAtores.length > 0 )
    return rsAtores
    } catch (error) {
        return false 
    };
}

const deleteAtores = async function (id) {
    try {
        let sql = `delete from tbl_ator WHERE id = ${id}`
        let rsAtores = await prisma.$queryRawUnsafe(sql);

        return rsAtores
    } catch (error) {
        return false
    }
}

const selectAtoresById = async function(id){
    try {
        let sql = `select * from tbl_ator where id = ${id}`;
        let rsAtores = await prisma.$queryRawUnsafe(sql);

            return rsAtores;
        } catch (error) {
            return false;
            
        }
}

const insertAtores = async function (dadosAtores){
    try {
        
        let sql 

        if (dadosAtores.data_falecimento != '' &&
        dadosAtores.data_falecimento != null && 
        dadosAtores.data_falecimento != undefined){
            
            sql = `insert into tbl_ator (
                nome,
                data_nascimento,
                data_falecimento,
                biografia,
                foto,
                tbl_sexo_id
            ) values (
                '${dadosAtores.nome}',
                '${dadosAtores.data_nascimento}',
                '${dadosAtores.data_falecimento}',
                '${dadosAtores.biografia}',
                '${dadosAtores.foto}',
                '${dadosAtores.sexo[0].id}'
            )`

            let result = await prisma.$executeRawUnsafe(sql)
            if (result)
            return true
            else
            return false

        } else {
            sql = `insert into tbl_ator (
                nome,
                data_nascimento,
                data_falecimento,
                biografia,
                foto,
                tbl_sexo_id
            ) values (
                '${dadosAtores.nome}',
                '${dadosAtores.data_nascimento}',
                null,
                '${dadosAtores.biografia}',
                '${dadosAtores.foto}',
                '${dadosAtores.sexo[0].id}'
            )`
            

            let result = await prisma.$executeRawUnsafe(sql)
            if (result)
            return true
            else
            return false
        }

    } catch (error) {
        return false
    }
}

const updateAtores = async function (id, dadosAtores){
    try {
        
        let sql 
        if(dadosAtores.data_falecimento!=''&&
        dadosAtores.data_falecimento!=null&&
        dadosAtores.data_falecimento!=undefined){

            sql = `update tbl_ator set 

            nome = '${dadosAtores.nome}',
            data_nascimento = '${dadosAtores.data_nascimento}',
            data_falecimento = '${dadosAtores.data_falecimento}',
            biografia = '${dadosAtores.biografia}',
            foto = '${dadosAtores.foto}',
            tbl_sexo_id = '${dadosAtores.sexo[0].id}' where tbl_ator.id = '${id}'
            `
        } else {
            sql = `update tbl_ator set 
                nome =  '${dadosAtores.nome}',
                data_nascimento = '${dadosAtores.data_nascimento}',
                data_falecimento =  null,
                biografia =  '${dadosAtores.biografia}',
                foto = '${dadosAtores.foto}',
                tbl_sexo_id = '${dadosAtores.sexo[0].id}' where tbl_ator.id = '${id}'`
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

const selectByNomeAtor = async function (nome) {
    try {
        let sql = `select * from tbl_ator where nome like "%${nome}%"`
        let rsAtores = await prisma.$queryRawUnsafe(sql)
        return rsAtores
    } catch (error) {
        return false
    }
}

const selectLastId = async function () {
    try {
        let sql ='select cast(last_insert_id() as decimal) as id from tbl_ator limit 1;'
        let rsLastID = await prisma.$queryRawUnsafe(sql)
        return rsLastID
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllAtores,
    deleteAtores,
    selectAtoresById,
    insertAtores,
    updateAtores,
    selectByNomeAtor,
    selectLastId
}