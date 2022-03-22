require('dotenv').config();

const { request } = require('express');
const e = require('express');

const {Client} = require('pg');
const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
});



client.connect()
    .then(()=> console.log('Conectado!'))
    .catch(err => console.log(err.stack));

const addPessoaBanco = (request, response) =>{
    const {nome,email,cpf,idade} = request.body;
    
    const query = `INSERT INTO cliente (nome,email,cpf,idade) VALUES ('${nome}','${email}','${cpf}','${idade}')`;

    client.query(query,(error, results) => {
            if(error){
                response.status(400).send(error);
                console.log(error);
                return;
            }
            response.status(200).send('Cadastrado');
        });
};
const loginC = (request, response) =>{
    const {cpf} = request.body;
    const query = `SELECT * FROM cliente WHERE cpf='${cpf}'`;
    client.query(query,(error, results) => {
        if(error){
            response.status(400).send(error);
            console.log(error);
            return;
        }
    return response.status(200).json(results.rows);
});
}
const loginL = (request, response) =>{
    const {id} = request.body;
    const query = `SELECT * FROM lojas WHERE id='${id}'`;
    client.query(query,(error, results) => {
        if(error){
            response.status(400).send(error);
            console.log(error);
            return;
        }
    return response.status(200).json(results.rows);
});
}
const contem = (request, response) =>{
    const {codigo} = request.body;
    const query = `SELECT * FROM produto WHERE id=${codigo}`;
    client.query(query,(error, results) => {
        if(error){
            response.status(400).send(error);
            console.log(error);
            return;
        }
    return response.status(200).json(results.rows);
});
}
const addLoja = (request,response) =>{
    const {nome,lat,lng} = request.body
    let id =Math.floor(Math.random() * 10000 + 1)
    console.log(lat)
    console.log(lng)
    const query = `INSERT INTO lojas (id,nome,localizacao) VALUES (${id},'${nome}', ST_GeomFromText('POINT(${lat} ${lng})'))`
    client.query(query,(error, results) => {
        if(error){
            response.status(400).send(error);
            console.log(error);
            return;
        }
        const result = {id:id}
        response.status(200).send(result);
    });
}
const addEstoque = (request,response) =>{
    const {idP,idL,quantidade} = request.body
    const query1 = `SELECT * FROM produtoloja WHERE idloja=${idL} AND idproduto=${idP}`
    client.query(query1,(error, results) => {
        if(error){
            console.log(error);
            return;
        }
        console.log(typeof(results.rows[0]))
        if(results.rows[0] !== undefined){
         let newQuantidade = results.rows[0].quantidade + Number(quantidade)
         console.log(typeof(results.rows[0].quantidade))
     //    console.log(typeof(quantidade))
         console.log(newQuantidade)
         const query3 = `UPDATE produtoloja SET quantidade=${newQuantidade} WHERE idloja=${idL} AND idproduto=${idP}`
         client.query(query3,(error, results) => {
            if(error){
                response.status(400).send(error);
                 console.log(error);
                 return;
             }
            response.status(200).send('Alterado');
        })
        } else {
            const query2 = `INSERT INTO produtoloja (idloja,idproduto,quantidade) VALUES (${idL},${idP},${quantidade})`
    client.query(query2,(error, results) => {
       if(error){
           response.status(400).send(error);
            console.log(error);
            return;
        }
       response.status(200).send('Adicionado');
   })
        }
    })}
const getLoja = (request,response)=>{
 const {id} = request.body
 const query = `select l.nome,ST_AsText(l.localizacao) AS localizacao,p.nome,pl.quantidade
 from lojas l,produtoloja pl,produto p
 WHERE pl.idloja=${id} AND l.id=${id} AND pl.idproduto=p.id`
 client.query(query,(error, results) => {
    if(error){
        response.status(400).send(error);
         console.log(error);
         return;
     }
    response.status(200).send(results.rows);
})
}
const getLojaC =(request,response) =>{
  let id
  const {lat,lng} = request.body
  const query1 =`SELECT l.id,st_distance(l.localizacao,ST_GeomFromText('POINT(${lat} ${lng})')) as distancia 
  from lojas l
  ORDER BY distancia ASC LIMIT 1`
client.query(query1,(error, results) => {
    if(error){
        response.status(400).send(error);
         console.log(error);
         return;
     }
      id=results.rows[0].id
      console.log(results.rows[0].id)
  const query2 = `select l.nome AS nomeloja,ST_AsText(l.localizacao) AS localizacao,p.nome,pl.quantidade
  from lojas l,produtoloja pl,produto p
  WHERE pl.idloja=${id} AND l.id=${id} AND pl.idproduto=p.id`
  client.query(query2,(error, results) => {
    if(error){
        response.status(400).send(error);
         console.log(error);
         return;
     }
     
    response.status(200).send(results.rows);
})
})

}
 //   const query2 = `INSERT INTO produtoloja (idloja,idproduto,quantidade) VALUES (${idL},${idP},${quantidade})`
  //  client.query(query2,(error, results) => {
   //     if(error){
 //           response.status(400).send(error);
  //          console.log(error);
 //           return;
   //     }
  //      response.status(200).send('Adicionado');
 //   });



module.exports = {
    addPessoaBanco,
    loginC,
    loginL,
    contem,
    addLoja,
    addEstoque,
    getLoja,
    getLojaC
};