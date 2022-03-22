function loginC(){

    const obj = {
        cpf: document.getElementById('cpf').value,
        
    };
  
    fetch("http://localhost:3001/loginC",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(response => response.json())
      .then(response => (
        setLocalStorageLoginC(JSON.stringify(response[0]))))
      .catch(err => console.log(err))
    
  }
  function loginL(){

    const obj = {
      id: document.getElementById('id').value,
        
    };
  
    fetch("http://localhost:3001/loginL",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(response => response.json())
      .then(response => (
        setLocalStorageLoginL(JSON.stringify(response[0]))))
      .catch(err => console.log(err))
    
  }
  function setLocalStorageLoginC(login){
   localStorage.clear()
   localStorage.setItem('loginC',`${login}`)
   window.location.href = 'http://localhost:3001/pedidos'
 }
 function setLocalStorageLoginL(login){
  localStorage.clear()
  localStorage.setItem('loginL',`${login}`)
  window.location.href = 'http://localhost:3001/estoque'
}
  function addPessoa(){

    const obj = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        cpf: document.getElementById('cpf').value,
        idade: document.getElementById('idade').value,
    };

    fetch("http://localhost:3001/salvar",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(response =>{
        alert('Cadastrado')
       window.location.href='/login'
})
    
    .catch(error => alert('Falha ao salvar!'));    

}
if(window.location == 'http://localhost:3001/pedidos'){
let obj=JSON.parse(localStorage.getItem('loginC'))
let nome=obj.nome
let divNome=document.createElement('div')
 let h1nome=document.createElement('h1')
   let nome2=document.createTextNode('Bem vindo(a) '+ nome)
  h1nome.appendChild(nome2)
 divNome.appendChild(h1nome)

  let divAtual = document.getElementById("nome");
  divAtual.parentNode.insertBefore(divNome, divAtual);
  }


  function addEstoque(){
    let arrayObj = []
    const loja = JSON.parse(localStorage.getItem('loginL'))
    const id = {
        key:loja.id
    }
    fetch("http://localhost:3001/getRedis",{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
     }).then(response => response.json())
     .then(response => {
       
        let str = response.produtos;
        console.log(response.produtos)
        str=str.slice(0,-1)
        let array = str.split("/")
      array.forEach(element => {
    
    arrayObj.push(JSON.parse(element))
     }
     )
     
    arrayObj.forEach(element =>{
    const obj ={
      idP: element.codigo,
      idL: loja.id,
      quantidade:element.quant
    }
      fetch("http://localhost:3001/addEstoque",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
        }).catch(error => alert('Falha ao salvar!')
        )})})
    .then(
      fetch("http://localhost:3001/rmRedis",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id)
        })).catch(error => alert('Falha ao salvar!'))
       .then(reponse => {
   //    window.location.href = 'http://localhost:3001/home' 
       
      }
      ) 
    }
