require('dotenv').config();

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

const addPonto = (request, response) =>{
    const {nome,descricao,valor,avaliacao, lat, lng} = request.body;
    
    let id=Math.floor(Math.random() * 65536)

    const query = `INSERT INTO locais_de_encontro (id,nome,descricao,valor,avaliacao, localizacao) VALUES ('${id}','${nome}','${descricao}','${valor}','${avaliacao}', ST_GeomFromText('POINT(${lat} ${lng})'))`;

    client.query(query,(error, results) => {
            if(error){
                response.status(400).send(error);
                console.log(error);
                return;
            }
            response.status(200).send('Inserido');
        });
};
const getPonto = (request, response) =>{
    const {nome} = request.body;

    const query = `SELECT id,nome,descricao,valor,avaliacao, ST_AsText (localizacao) AS localizacao from locais_de_encontro where nome='${nome}'`;

    client.query(query,(error, results) => {
            if(error){
                response.status(400).send(error);
                console.log(error);
                return;
            }
            return response.status(200).json(results.rows);
        });
};
module.exports = {
    addPonto,
    getPonto
};