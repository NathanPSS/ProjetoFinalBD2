function getMongo(){
    const pessoa = JSON.parse(localStorage.getItem('loginC'))
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
  function setMongoC(){
    let arrayObj = []
    const pessoa = JSON.parse(localStorage.getItem('loginC'))
    const cpf = {
        key:pessoa.cpf
    }
    fetch("http://localhost:3001/getRedis",{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cpf)
     }).then(response => response.json())
     .then(response => {
       
        let str = response.produtos;
        str=str.slice(0,-1)
        let array = str.split("/")
      array.forEach(element => {
    
    arrayObj.push(JSON.parse(element))
     }
     )
       
    const obj = {
        pessoa: pessoa,
        produtos: arrayObj
    }

    fetch("http://localhost:3001/setMongo",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(
        fetch("http://localhost:3001/rmRedis",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cpf)
        }).catch(error => alert('Falha ao salvar!'))
       
      ).then(reponse => {
       window.location.href = 'http://localhost:3001/home' 
  
      }

      )},
      )
}
function setMongoP(){
  let arrayObj = []
  const pessoa = JSON.parse(localStorage.getItem('loginC'))
  const cpf = {
      key:pessoa.cpf
  }
  fetch("http://localhost:3001/getRedis",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cpf)
   }).then(response => response.json())
   .then(response => {
     
      let str = response.produtos;
      str=str.slice(0,-1)
      let array = str.split("/")
    array.forEach(element => {
  
  arrayObj.push(JSON.parse(element))
   }
   )
     
  const obj = {
      pessoa: pessoa,
      produtos: arrayObj
  }

  fetch("http://localhost:3001/setMongo",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(
      fetch("http://localhost:3001/rmRedis",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cpf)
      }).catch(error => alert('Falha ao salvar!'))
     
    ).then(reponse => {
     window.location.href = 'http://localhost:3001/home' 

    }

    )},
    )
}

