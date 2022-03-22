const express = require('express');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
const port = 3003;

app.listen(port, ()=>{
    console.log(`App running on port ${port}.`);
});
app.get('/main',function(req,res){
    res.sendFile('/home/nathan/MiniProjeto API Google Maps/Exemplo-Mapa/index.html')
}
)
app.get('/css',function(req,res){
    res.sendFile('/home/nathan/MiniProjeto API Google Maps/Exemplo-Mapa/assets/css/style.css')
}
)
app.get('/js',function(req,res){
    res.sendFile('/home/nathan/MiniProjeto API Google Maps/Exemplo-Mapa/assets/javascript/mapa.js')
}
)
const db = require('./database/database');

app.post('/pontos', db.addPonto);
app.post('/getPonto', db.getPonto);