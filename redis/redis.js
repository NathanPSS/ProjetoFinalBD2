require("dotenv").config()
const Redis = require('ioredis')
const {request,response} = require("express")

const client = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST
})
const setRedis = 

async (request,response) => {
  
const {key,produtos} = request.body
 
 const result =  await client.set(`${key}`, `${produtos}`,'EX',7200);

  response.send(result)
};
const getRedis = async (request,response) => {
  const {key} = request.body
     const result = {produtos:  await client.get(key) }
    
      response.send(result)
    }
const rmRedis = async (request,response) =>{
  const {key} = request.body
  const query = await client.del(`${key}`)
  response.send('Deletado')
}
module.exports = {
    setRedis,
    getRedis,
    rmRedis
}