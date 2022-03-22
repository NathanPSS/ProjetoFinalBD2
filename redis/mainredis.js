function getRedis(){
    const obj = {
    id:localStorage.getItem("IdLogin")
    }
     fetch("http://localhost:3001/getRascunho",{
       method: 'POST',
       headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
       },
       body: JSON.stringify(obj)
     }
     ).then(response => response.json()) .then(response => setRascunho(response.areatexto))
  }
  function setRascunho(response){
    document.getElementById('areatexto').value = response
  }
 function setRedisC(){
 let objP = JSON.parse(localStorage.getItem('loginC'))
 let cpf = objP.cpf
 let produtos
 let produtosNow
 const getobj ={
     key:cpf
 }
 fetch("http://localhost:3001/getRedis",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
   body: JSON.stringify(getobj)
  }).then(response => response.json())
  .then(response => {
      let produtos=response
      const codigo={
        codigo: Number(document.getElementById("codigo").value)
      }

      fetch("http://localhost:3001/getPgC",{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
       body: JSON.stringify(codigo)
      })
  .then(response => response.json())
  .then(response => contineC(produtos,response[0].nome))
    })
function contineC(produtos,nome){

  const objP= {
      codigo: document.getElementById("codigo").value,
      quant: document.getElementById("quant").value,
      nome: nome
  }
  if(produtos.produtos === null){
      produtosNow=JSON.stringify(objP) + "/"
  }
  else{
      produtosNow=produtos.produtos +JSON.stringify(objP) +"/" 
  }
    const obj = {
        key: cpf,
        produtos: produtosNow
    };
    fetch("http://localhost:3001/setRedis",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(() => {
      document.location.reload(true)
     getProdutoP()
    }
    )
    .catch(err => console.log(err))
}
}
function refresh(){
    window.location.href ='http://localhost:3001/pedidos'
}
function criDivProduto(element){
 
}
  function getProdutoP(){
    let objP=JSON.parse(localStorage.getItem('loginC'))
    let cpf=objP.cpf
      const obj = {
       key:cpf
      }
        fetch("http://localhost:3001/getRedis",{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
     }).then(response => response.json())
     .then(response => {
        let str = response.produtos;
        
        str=str.slice(0,-1)
        let array = str.split("/")
        let table=document.createElement('table')
        table.setAttribute('class','table table-striped')
         let thHead = document.createElement('thead')
         let tr=document.createElement('tr')
         let th1=document.createElement('th')
         let th2=document.createElement('th')
         let th3=document.createElement('th')
         let th4=document.createElement('th')
         th1.setAttribute('scope','row')
         th2.setAttribute('scope','row')
         th3.setAttribute('scope','row')
         let th1T = document.createTextNode('Código')
         let th2T = document.createTextNode('Produto')
         let th3T = document.createTextNode('Quantidade')
         let tBody = document.createElement('tbody')
         th1.appendChild(th1T)
         th2.appendChild(th2T)
         th3.appendChild(th3T)
         tr.appendChild(th1)
         tr.appendChild(th2)
         tr.appendChild(th3)
         tr.appendChild(th4)
         thHead.appendChild(tr)
     if (response.produtos !== ""){
         let botao2=document.createElement('button')
        botao2.setAttribute('onclick','setMongoC()')
         botao2.setAttribute('class','btn btn-primary')
         botao2.setAttribute('style','float: right;')
         botao2.setAttribute('type','button')
         let botaoTexto2=document.createTextNode('Finalizar')
         botao2.appendChild(botaoTexto2)
         document.getElementById('botao-finaliza').appendChild(botao2)
     }
         thHead.setAttribute('style','background-color: mediumseagreen;')
        array.forEach(element => {
          let obj = JSON.parse(element)
          let botao1=document.createElement('button')
   
          let botaoTexto=document.createTextNode('DELETAR')
        
          botao1.setAttribute('class','btn btn-danger')
          botao1.setAttribute('type','button')
          botao1.addEventListener('click',rmRedisC)
          botao1.appendChild(botaoTexto)
          botao1.setAttribute('id',obj.codigo)
        
          let tr = document.createElement('tr')
          let td1 = document.createElement('td')
          let td2 = document.createElement('td')  
          let td3 = document.createElement('td')
          let td4= document.createElement('td')
          let td1T = document.createTextNode(obj.codigo)
          let td2T = document.createTextNode(obj.nome)
          let td3T = document.createTextNode(obj.quant)
          td1.appendChild(td1T)
          td2.appendChild(td2T)
          td3.appendChild(td3T)
          td4.appendChild(botao1)
          tr.appendChild(td1)
          tr.appendChild(td2)
          tr.appendChild(td3)
          tr.appendChild(td4)
          tr.setAttribute('id',obj.codigo)
          tBody.appendChild(tr)
        });
        table.appendChild(thHead)
         table.appendChild(tBody)
        document.getElementById('produtos').appendChild(table)
 })}
 function getProdutoL(){
  let objP=JSON.parse(localStorage.getItem('loginL'))
  let id=objP.id
    const obj = {
     key:id
    }
      fetch("http://localhost:3001/getRedis",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
   }).then(response => response.json())
   .then(response => {
      let str = response.produtos;
      str=str.slice(0,-1)
      let array = str.split("/")
      let table=document.createElement('table')
      table.setAttribute('class','table table-bordered')
       let thHead = document.createElement('thead')
       let tr=document.createElement('tr')
       let th1=document.createElement('th')
       let th2=document.createElement('th')
       let th3=document.createElement('th')
       let th4 = document.createElement('th')
       th1.setAttribute('scope','row')
       th2.setAttribute('scope','row')
       th3.setAttribute('scope','row')
       let th1T = document.createTextNode('Código')
       let th2T = document.createTextNode('Produto')
       let th3T = document.createTextNode('Quantidade')
       let tBody = document.createElement('tbody')
       if (response.produtos !== ""){
        let botao2=document.createElement('button')
       botao2.setAttribute('onclick','addEstoque()')
        botao2.setAttribute('class','btn btn-primary')
        botao2.setAttribute('style','float: right;')
        botao2.setAttribute('type','button')
        let botaoTexto2=document.createTextNode('Finalizar')
        botao2.appendChild(botaoTexto2)
        document.getElementById('botao-finaliza').appendChild(botao2)
    }
       th1.appendChild(th1T)
       th2.appendChild(th2T)
       th3.appendChild(th3T)
       tr.appendChild(th1)
       tr.appendChild(th2)
       tr.appendChild(th3)
       tr.appendChild(th4)
       thHead.appendChild(tr)
       thHead.setAttribute('style','background-color: royalblue;')
      array.forEach(element => {
        let obj = JSON.parse(element)
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')  
        let td3 = document.createElement('td')
        let td4 = document.createElement('td')
        let td1T = document.createTextNode(obj.codigo)
        let td2T = document.createTextNode(obj.nome)
        let td3T = document.createTextNode(obj.quant)
        let botao = document.createElement('button')
        let botaoTexto=document.createTextNode('DELETAR')
        botao.setAttribute('class','btn btn-danger')
        botao.setAttribute('type','button')
        botao.addEventListener('click',rmRedisL)
        botao.appendChild(botaoTexto)
        botao.setAttribute('id',obj.codigo)
        td1.appendChild(td1T)
        td2.appendChild(td2T)
        td3.appendChild(td3T)
        td4.appendChild(botao)
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tBody.appendChild(tr)
      });
      table.appendChild(thHead)
       table.appendChild(tBody)
      document.getElementById('produtos').appendChild(table)
})}
function setRedisL(){
  let objP = JSON.parse(localStorage.getItem('loginL'))
  let id = objP.id
  let produtos
  let produtosNow
  const getobj ={
      key:id
  }
  fetch("http://localhost:3001/getRedis",{
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
    body: JSON.stringify(getobj)
   }).then(response => response.json())
   .then(response => {
       let produtos=response
       const codigo={
         codigo: Number(document.getElementById("codigo").value)
       }
 
       fetch("http://localhost:3001/getPgC",{
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
        body: JSON.stringify(codigo)
       })
   .then(response => response.json())
   .then(response => contineC(produtos,response[0].nome))
     })
 function contineC(produtos,nome){
 
   const objP= {
       codigo: document.getElementById("codigo").value,
       quant: document.getElementById("quant").value,
       nome: nome
   }
   if(produtos.produtos === null){
       produtosNow=JSON.stringify(objP) + "/"
   }
   else{
       produtosNow=produtos.produtos +JSON.stringify(objP) +"/" 
   }
     const obj = {
         key: id,
         produtos: produtosNow
     };
     fetch("http://localhost:3001/setRedis",{
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(obj)
     }).then(() => {
       document.location.reload(true)
      getProdutoL()
     }
     )
     .catch(err => console.log(err))
 }
 }
 if (window.location.href == 'http://localhost:3001/estoque'){
  getProdutoL()
 }
if (window.location.href == 'http://localhost:3001/pedidos'){

  getProdutoP()
}

 function rmRedisC(evt){
  let arrayObj=[]
  let strR=""
 console.log(typeof(evt.target.id))
  let objP = JSON.parse(localStorage.getItem('loginC'))
  let cpf = objP.cpf
  let produtos
  let produtosNow
  const getobj ={
      key:cpf
  }
  fetch("http://localhost:3001/getRedis",{
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
    body: JSON.stringify(getobj)
   }).then(response => response.json())
   .then(response => {
       let produtos=response
       const codigo={
         codigo: Number(evt.target.id)
       }
       fetch("http://localhost:3001/getPgC",{
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
        body: JSON.stringify(codigo)
       })
   .then(response => response.json())
   .then(response => rmcontineC(produtos,response[0].nome))
     })
 function rmcontineC(produtos,nome){
  
  let str = produtos.produtos
        str=str.slice(0,-1)
        let array = str.split("/")
      console.log(array)
  array.forEach(element =>{
 
    if(Number(JSON.parse(element).codigo) != Number(evt.target.id)){
    
    arrayObj.push(JSON.parse(element))
    strR=strR+element+'/'
  }})

   const objP= {
       codigo: document.getElementById("codigo").value,
       quant: document.getElementById("quant").value,
       nome: nome
   }
   if(produtos.produtos === null){
       produtosNow=JSON.stringify(objP) + "/"
   }
   else{
       produtosNow=produtos.produtos +JSON.stringify(objP) +"/" 
   }
     const obj = {
         key: cpf,
         produtos: strR
     };
     fetch("http://localhost:3001/setRedis",{
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(obj)
     }).then(() => {
      document.location.reload(true)
      getProdutoP()
     }
     )
     .catch(err => console.log(err))
 }
 }
 function rmRedisL(evt){
  let arrayObj=[]
  let strR=""
 console.log(typeof(evt.target.id))
  let objP = JSON.parse(localStorage.getItem('loginL'))
  let id = objP.id
  let produtos
  let produtosNow
  const getobj ={
      key:id
  }
  fetch("http://localhost:3001/getRedis",{
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
    body: JSON.stringify(getobj)
   }).then(response => response.json())
   .then(response => {
       let produtos=response
       const codigo={
         codigo: Number(evt.target.id)
       }
       fetch("http://localhost:3001/getPgC",{
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
        body: JSON.stringify(codigo)
       })
   .then(response => response.json())
   .then(response => rmcontineL(produtos,response[0].nome))
     })
 function rmcontineL(produtos,nome){
  
  let str = produtos.produtos
        str=str.slice(0,-1)
        let array = str.split("/")
      console.log(array)
  array.forEach(element =>{
 
    if(Number(JSON.parse(element).codigo) != Number(evt.target.id)){
    
    arrayObj.push(JSON.parse(element))
    strR=strR+element+'/'
  }})

   const objP= {
       codigo: document.getElementById("codigo").value,
       quant: document.getElementById("quant").value,
       nome: nome
   }
   if(produtos.produtos === null){
       produtosNow=JSON.stringify(objP) + "/"
   }
   else{
       produtosNow=produtos.produtos +JSON.stringify(objP) +"/" 
   }
     const obj = {
         key: id,
         produtos: strR
     };
     fetch("http://localhost:3001/setRedis",{
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(obj)
     }).then(() => {
      document.location.reload(true)
      getProdutoL()
     }
     )
     .catch(err => console.log(err))
 }
 }