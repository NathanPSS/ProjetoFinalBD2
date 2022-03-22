const express = require('express');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;
app.get('/',function (req,res){
    res.sendFile("/home/nathan/ProjetoFinal/AtividadeREDIS/html/home.html")
})
app.get('/cadastro',function (req,res){
    res.sendFile("/home/nathan/ProjetoFinal/AtividadeREDIS/html/cadastro.html")
})
app.get('/login',function (req,res){
    res.sendFile('/home/nathan/ProjetoFinal/AtividadeREDIS/html/login.html')
})
app.get('/lojas',function(req,res){
    res.sendFile('/home/nathan/ProjetoFinal/AtividadeREDIS/html/lojas.html')
})
app.get('/lojaLogin',function(req,res){
    res.sendFile('/home/nathan/ProjetoFinal/AtividadeREDIS/html/loginLoja.html')
})
app.get('/estoque',function(req,res){
    res.sendFile('/home/nathan/ProjetoFinal/AtividadeREDIS/html/atualizaEstoque.html')
})
app.get('/css', function(req,res){
    res.sendFile("/home/nathan/ProjetoFinal/css/carrousel.css")
})
app.get('/cssmapa', function(req,res){
    res.sendFile("/home/nathan/ProjetoFinal/AtividadeREDIS/googlemaps/Exemplo-Mapa/assets/css/style.css")
})
app.get('/jsmapa',function(req,res){
    res.sendFile("/home/nathan/ProjetoFinal/AtividadeREDIS/googlemaps/Exemplo-Mapa/assets/javascript/mapa.js")
})
app.get('/home', function(req,res){
    res.sendFile("/home/nathan/ProjetoFinal/AtividadeREDIS/html/home.html")
})
app.get('/postgres',function(req,res){
    res.sendFile('/home/nathan/ProjetoFinal/AtividadeREDIS/database/maindatabase.js')
})
app.get('/mongo',function(req,res){
    res.sendFile('/home/nathan/ProjetoFinal/AtividadeREDIS/mongo/mainmongo.js')
})
app.get('/redis',function(req,res){
    res.sendFile('/home/nathan/ProjetoFinal/AtividadeREDIS/redis/mainredis.js')
})
app.get('/pedidos', function(req,res){
    res.sendFile('/home/nathan/ProjetoFinal/AtividadeREDIS/html/pedidos.html')
})
app.get('/lojaC', function(req,res){
    res.sendFile('/home/nathan/ProjetoFinal/AtividadeREDIS/html/lojasC.html')
})
app.get('/imgGoogle',function(req,res){
    res.sendFile('/home/nathan/ProjetoFinal/AtividadeREDIS/img/Google-Maps.png')
})
app.get('/imgLogin',function(req,res){
    res.sendFile('/home/nathan/ProjetoFinal/AtividadeREDIS/img/fe324f0747cecedd1fdb16d2814ff16d-valentine-parfuem-liebe.png')
})
app.get('/imgCadastro',function(req,res){
    res.sendFile('/home/nathan/ProjetoFinal/AtividadeREDIS/img/3534139.png')
})
app.get('/imgIcon',function(req,res){
    res.sendFile('/home/nathan/ProjetoFinal/AtividadeREDIS/img/14X14-Simples-Vidro-Perfume-OPA1825-Colorido.webp')
})
const db = require('./database/database');
const mg = require('./mongo/mongo')
 const rd = require('./redis/redis')



app.post('/salvar', db.addPessoaBanco);
app.post('/loginL', db.loginL);
app.post('/loginC', db.loginC);
app.post('/getMongo', mg.getMongo);
app.post('/setMongo',mg.setMongo)
app.post('/delet', mg.rmMongo)
app.post('/getRedis',rd.getRedis)
app.post('/setRedis',rd.setRedis)
app.post('/rmRedis',rd.rmRedis)
app.post('/getPgC',db.contem)
app.post('/salvaLoja',db.addLoja)
app.post('/addEstoque',db.addEstoque)
app.post('/getLoja',db.getLoja)
app.post('/getLojaC',db.getLojaC)
app.get('/main', function (req,res) {
    res.sendFile("/home/nathan/AtividadeMongoDB/AtividadeREDIS/assets/js/main.js")
})
// app.get('/rascunho', rd.getRedis);
app.listen(port, ()=>{
    console.log(`App running on port ${port}.`);
});