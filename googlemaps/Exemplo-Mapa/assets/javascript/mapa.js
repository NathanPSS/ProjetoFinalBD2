




let map;
let marker;

let center = {lat: -6.888463202449027, lng: -38.558930105104125};

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 14,
  });

  marker = new google.maps.Marker({
      map: map,
      position: center,
      draggable: true
  });

  map.addListener("click", (evt) => {
    addMarker(evt);
  });

  marker.addListener('position_changed', ()=>{
      map.setCenter(marker.position);
  });

}

function addMarker(evt){
    marker.setPosition(evt.latLng);
}
function salvar(){

    const obj = {
        nome: document.getElementById('nome').value,
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng(),
    };
    fetch("http://localhost:3001/salvaLoja",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(response => response.json()).then(response =>
      {
      alert(`Inserido! id da loja ID:${response.id}`)
    })
    .catch(error => alert('Falha ao salvar!'));    
}
function posicionarL(){

  const obje = {
      id: document.getElementById('id').value
  };
 console.log(marker.getPosition().lat())
 console.log(marker.getPosition().lng())
  fetch("http://localhost:3001/getLoja",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obje)
  })
  .then(response =>response.json())
  .then(response =>{
    formata(response)
  }
    )

  .catch(error => {
    alert('Falha ao recuperar!')
  
  });    
}
function posicionarC(){
 const obj = {
   lat: marker.getPosition().lat(),
   lng: marker.getPosition().lng()
 }
 console.log(marker.getPosition().lat())
 console.log(marker.getPosition().lng())
  fetch("http://localhost:3001/getLojaC",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  .then(response =>response.json())
  .then(response =>{
    formata(response)
  }
    )

  .catch(error => {
    alert('Falha ao recuperar!')
  
  });    
}
function formata(response){
let i=response[0].localizacao
console.log(response[0].localizacao)
let lat= i.slice(6,23)
let lng= i.slice(24,40)
const obj = { lat: parseFloat(lat), lng : parseFloat(lng)}
marker.setPosition(obj)
let tableE=document.getElementById('table')
let tituloE=document.getElementById('titulo')

if(tableE != null){
  document.getElementById('lojas').removeChild(tableE)
  document.getElementById('lojas').removeChild(tituloE)
}
let h4=document.createElement('h4')
h4.setAttribute('id','titulo')
console.log(response[0].nomeloja)
let nomeL=document.createTextNode(response[0].nomeloja)
h4.appendChild(nomeL)
document.getElementById('lojas').appendChild(h4)
let table=document.createElement('table')
table.setAttribute('class','table table-bordered')
table.setAttribute('id','table')
 let thHead = document.createElement('thead')
 let tr=document.createElement('tr')
 let th1=document.createElement('th')
 
 th1.setAttribute('scope','row')

 let th1T =document.createTextNode('Produtos Disponiveis')
 
 let tBody = document.createElement('tbody')
 th1.appendChild(th1T)

 tr.appendChild(th1)

 thHead.appendChild(tr)
 let array =response
 
 thHead.setAttribute('style','background-color: lightcyan;')
array.forEach(element => {
  let tr = document.createElement('tr')
  let td1 = document.createElement('td')
  
  let td1T = document.createTextNode(element.nome)
  
  td1.appendChild(td1T)
  
  tr.appendChild(td1)
  
  tBody.appendChild(tr)
});
table.appendChild(thHead)
 table.appendChild(tBody)
document.getElementById('lojas').appendChild(table)
}


