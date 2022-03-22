




function nomeTimeline(){

let nomeP =JSON.parse(localStorage.getItem('login'))
let nomeH='Seja Bem Vindo ' + nomeP.nome
document.getElementById('nomeTitulo').innerHTML = nomeH

}
function getTimeline(){
  fetch("http://localhost:3001/timeline",
  {
    method: 'GET'
  },
  )
}

function addPessoa(){

    const obj = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };

    fetch("http://localhost:3001/salvar",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(response =>{alert('Cadastrado')})
    .catch(error => alert('Falha ao salvar!'));    

}
 function setMongo(){
  
  const pessoa = JSON.parse(localStorage.getItem('login'))
  const obj = {
    
       
    
      titulo: document.getElementById('titulo').value,
      texto: document.getElementById('texto').value,
     dadosPessoa: pessoa,
  };

  fetch("http://localhost:3001/salvarMg",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(response =>limpa())
    
  .catch(error => alert('Falha ao salvar!'));    

}
function login(){

  const obj = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      
  };

  fetch("http://localhost:3001/getPg",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(response => response.json())
    .then(response => (response))
    .then(response => (
      setLocalStorageLogin(JSON.stringify(response[0]))))
    .catch(err => console.log(err))
  
}
function getMongo(){
  const pessoa = JSON.parse(localStorage.getItem('login'))
  const obj = {
      pessoa: pessoa  
  };

  fetch("http://localhost:3001/getMongo",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(response => response.json())
  .then(response => (response))
  .then(response => (
    setLocalStoragePosts(JSON.stringify(response))))
  .catch(err => console.log(err))
  }
function setLocalStorageLogin(response) {
    localStorage.setItem('login',response)
    if(localStorage.getItem('login') === 'undefined'){
      window.alert('Error')
    }
   else{
    window.location.href = 'http://localhost:3001/timeline'
   }
    
}
function setLocalStoragePosts(response) {
  localStorage.setItem('posts',response)
  window.location.href = 'http://localhost:3001/posts'
}
function limpa(){
  document.getElementById('titulo').value = ''
  document.getElementById('texto').value = ''
}


function setPosts(){

  let array = JSON.parse(localStorage.getItem('posts'))
    array.forEach(element => {
    
    criaPosts(element)
    })
}
function criaPosts(element){
  
  let divNova= document.createElement("div")
  let divNovaTitulo = document.createElement("div");
  let divNovaParagrafo = document.createElement("div")

  let h2NovoTexto = document.createTextNode(element.titulo)
  let pNovoTexto = document.createTextNode(element.texto)
  

  let Titulo = document.createElement("h2")
  let Paragrafo = document.createElement("p")
 


  
 
  Paragrafo.appendChild(pNovoTexto)
  divNovaParagrafo.appendChild(Paragrafo)
  Titulo.appendChild(h2NovoTexto)
  divNovaTitulo.appendChild(Titulo)
 divNova.appendChild(divNovaTitulo)
 divNova.appendChild(divNovaParagrafo)


  let divAtual = document.getElementById("posts");
  divAtual.parentNode.insertBefore(divNova, divAtual);
 
}
if (window.location == 'http://localhost:3001/timeline'){
  nomeTimeline()
}
if (window.location == 'http://localhost:3001/posts'){
setPosts()

}
function sair(){
  window.location.href = 'http://localhost:3001/login'
}
function deletaPosts(){
  const pessoa = JSON.parse(localStorage.getItem('login'))
  const obj = {
    pessoa: pessoa
  }
  fetch('http://localhost:3001/delet',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
}
function getProduto(){
  let objP = JSON.parse(localStorage.getItem('login'))
  let cpf = objP.cpf
  const getobj ={
    cpf:cpf
}
fetch("http://localhost:3001/getRedis",{
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   },
  body: JSON.stringify(getobj)
 }).then(response => response.json())
 .then(response =>{
   let array=response.slice('/')
   console.log(array)
 }
 )
}
