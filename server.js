import { fastify } from 'fastify'
import {DatabaseMemory} from "./database-memory.js"

const server = fastify()
const database = new DatabaseMemory()

server.get('/', () => {
    return 'Olá Mundo'
})

server.post('/gato', (request, reply) => {
    //const body = request.body//
   //console.log(body)//
   const {nome, dono, tipoPelo, idade, temperamento } = request.body
    database.create({
        nome: nome,
        dono: dono,
        tipoPelo: tipoPelo,
        idade: idade,
        temperamento: temperamento,
    })
    console.log(database.list())
    return reply.status(201).send()
})

server.get('/gato', (request) => {
   
    const search = request.query.search

    console.log(search)

    const gatos = database.list(search)

    return gatos
})




server.put('/gato/:id',(request, reply)=> {

    const gatoId = request.params.id
    const  {nome, dono, tipoPelo, idade, temperamento} = request.body
    const gato = database.update(gatoId, {
        nome: nome,
        dono: dono,
        tipoPelo: tipoPelo,
        idade: idade,
        temperamento: temperamento,
    })
    return reply.status(204).send()
    
})
server.delete('/gato/:id', (request, reply) => {
    const gatoId  = request.params.id
    database.delete(gatoId)
    return reply.status(204).send()
})

server.listen({
    port: 8080,

})

