/**
 * npm install prisma --save (realiza a conexão com o banco)
 * npm install @prisma/client --save (executa os scripts SQL)
 * npx prisma init
 */
// --------------------------------------------------------------------------------------//
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const funcoes = require('./controller/funcoes.js')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors)
    next()

})

// --------------------------------------------------------------------------------------//

const controllerFilmes = require('./controller/controller_filme.js') 

const controllerGeneros = require('./controller/controller_generos.js')

const controllerClassificacao = require('./controller/controller_classificacao.js')

const controllerAtor = require('./controller/controller_atores.js')

const controllerDiretor = require('./controller/controller_diretores.js')


// --------------------------------------------------------------------------------------//
const bodyParserJSON = bodyParser.json()
app.use(bodyParserJSON)
// --------------------------------------------------------------------------------------//
app.get('/v1/acmefilmes/filmes', cors(), async(request, response, next) => {
    response.json(funcoes.getListaFilmes())
    response.status(200)
})


app.get('/v1/acmefilmes/filme/:id', cors(), async(request, response, next) => {

    let idFilme = request.params.id

    response.json(funcoes.getFilme(idFilme))
    response.status(200)
})


app.get('/v2/acmefilmes/filmes', cors(), async(request, response, next) => {
    let dadosFilmes = await controllerFilmes.getListarFilmes()

    if (dadosFilmes) response.json(dadosFilmes), response.status(200)
    else response.json({ message: "nenhum registro encontrado" }), response.status(404)
})
app.get('/v2/acmefilmes/filme/:id', cors(), async(request, response, next) => {
    let idFilme = request.params.id

    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)

})
app.get('/v2/acmefilmes/filtro/filme/', cors(), async(request, response, next) => {
    let name = request.query.nome

    let dadosFilme = await controllerFilmes.getFilmeNome(name)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})
app.post('/v2/acmefilmes/filme', cors(), bodyParserJSON, async(request, response, next) => {

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controllerFilmes.setNovoFilme(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})
app.put('/v2/acmefilmes/atualizarFilme/', cors(), bodyParserJSON, async(request, response, next) => {

    let contentType = request.headers['content-type']
    let novosDados = request.body

    let resultDados = await controllerFilmes.setAtualizarFilme(novosDados, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

// Classificação
app.get('/v2/acmefilmes/classificacao', cors(), async function(request, response){
    let dadosClassi = await controllerClassificacao.getListarClassificacao()
    response.status(200)
    response.json(dadosClassi)

})
app.get('/v2/acmefilmes/classificacao/:id', cors(), async function(request, response){
    let id = request.params.id
    let dados = await controllerClassificacao.getBuscarClassificacao(id)
    console.log(dados);

    response.status(dados.status_code)
    response.json(dados)
})
app.post('/v2/acmefilmes/classificacao', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let newClassificacao = await controllerClassificacao.setInserirClassificacao(dadosBody, contentType)
    response.status(newClassificacao.status_code)
    response.json(newClassificacao)
})
app.put('/v2/acmefilmes/classificacao/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let idClassi = request.params.id
    let dadosPUT = request.body

    let resultUpdateClassificacao = await controllerClassificacao.setAtualizarClassificacao(idClassi, dadosPUT, contentType)
    response.status(resultUpdateClassificacao.status_code)
    response.json(resultUpdateClassificacao)
})
app.delete('/v2/acmefilmes/classificacao/:id', cors(), async function(request, response){
    let idClassi = request.params.id
    let dadosCLassi = await controllerClassificacao.setDeletarClassificacao(idClassi)
    response.status(dadosCLassi.status_code)
    response.json(dadosCLassi)
})

// Ator
app.get('/v2/acmefilmes/ator/:id', cors(), async function(request, response) {
    let idP = request.params.id
    let dados = await controllerAtor.getBuscarIdAtor(idP)

    // console.log(dados)
    response.status(dados.status_code)
    response.json(dados)
})
app.get('/v2/acmefilmes/ator', cors(), async function(request, response) {
    let dadosAtor = await controllerAtor.getListarAtores()

    response.status(200)
    response.json(dadosAtor)
})

app.post('/v2/acmefilmes/ator', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let newAtor = await controllerAtor.setInserirAtor(dadosBody, contentType)
    response.status(newAtor.status_code)
    response.json(newAtor)
})
app.put('/v2/acmefilmes/ator/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let idAtor = request.params.id
    let dadosPUT = request.body

    let resultUpdateAtor = await controllerAtor.setAtualizarAtor(idAtor, dadosPUT, contentType)
    response.status(resultUpdateAtor.status_code)
    response.json(resultUpdateAtor)
})
app.delete('/v2/acmefilmes/ator/:id', cors(), async function(request, response) {
    let idAtor = request.params.id
    let dadosAtor = await controllerAtor.setDeletarAtor(idAtor)
    response.status(dadosAtor.status_code)
    response.json(dadosAtor)
})

// Diretor 
app.get('/v2/acmefilmes/diretor', cors(), async function(request, response) {
    let dadosDiretor = await controllerDiretor.getListarDiretores()
    console.log(dadosDiretor);
    response.status(200)
    response.json(dadosDiretor)  
})
app.get('/v2/acmefilmes/diretor/:id', cors(), async function(request, response) {
    let idP = request.params.id
    let dados = await controllerDiretor.getBuscarDiretor(idP)

    response.status(dados.status_code)
    response.json(dados)
})
app.post('/v2/acmefilmes/diretor', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let newDiretor = await controllerDiretor.setInserirDiretor(dadosBody, contentType)
    response.status(newDiretor.status_code)
    response.json(newDiretor)
})
app.put('/v2/acmefilmes/diretor/:id', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let idDiretor = request.params.id
    let dadosPUT = request.body

    let resultUpdateAtor = await controllerDiretor.setAtualizarDiretor(idDiretor, dadosPUT, contentType)
    console.log(resultUpdateAtor)
    response.status(resultUpdateAtor.status_code)
    response.json(resultUpdateAtor)
})
app.delete('/v2/acmefilmes/diretor/:id', cors(), async function(request, response) {
    let idAtor = request.params.id
    let dadosAtor = await controllerAtor.setDeletarAtor(idAtor)
    response.status(dadosAtor.status_code)
    response.json(dadosAtor)
})


console.log("API funcionando na porta 8080")
app.listen(8080, () => {})



					