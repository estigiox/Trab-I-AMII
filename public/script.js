
function update(index,link){
    let tds = document.querySelectorAll(`td[data-index-row='${index}']`);
    let spans = document.querySelectorAll(`td[data-index-row='${index}'] > span`);
    let inputs = document.querySelectorAll(`td[data-index-row='${index}'] > input`);
    let lenTds = tds.length-1;
    let linkUpdate = tds[lenTds-1];
    let linkRemove = tds[lenTds];

    let lenInputs = inputs.length;

    let button = inputs[lenInputs-1];



    linkUpdate.className='hidden';
    linkRemove.className='hidden';
    tds[lenTds-2].className='show';


    for(let cont=0;cont<spans.length;cont++){
        if(spans[cont].className=="show"){
            spans[cont].className="hidden";
        } else{
            spans[cont].className="show";
        }
    }

    for(let cont=0;cont<inputs.length;cont++){
        if(inputs[cont].className=="hidden"){
            inputs[cont].className="show";
        }
    }

    button.addEventListener('click',()=>{
        if(valiDados(inputs)){
        
            const http = new XMLHttpRequest();
            let data = {id:"",name:"",email:"",address:"",age:"",height:"",vote:""};
            let dataToSend;



            http.open("POST",link,true);

            http.setRequestHeader('Content-Type','application/json');

            for(let cont=0;cont<inputs.length;cont++){
                if(inputs[cont].disabled==true){
                    inputs[cont].disabled=false;
                } else inputs[cont].disabled=true;
            }

            data.id = index;
            data.name = inputs[0].value;
            data.email = inputs[1].value;
            data.address = inputs[2].value;
            data.age = inputs[3].value;
            data.height = inputs[4].value;
            data.vote = inputs[5].value;

            dataToSend = JSON.stringify(data);

            http.send(dataToSend);

            http.onload = ()=>{

                if (http.readyState === 4 && http.status === 200) {                
                    for(let cont=0;cont<spans.length;cont++){
                        if(spans[cont].className=="hidden"){
                            spans[cont].innerHTML = inputs[cont].value;
                            spans[cont].className="show";
                        } else{
                            spans[cont].className="hidden";
                        }
                    }


                    for(let cont=0;cont<inputs.length;cont++){
                        if(inputs[cont].className=="show"){
                            inputs[cont].className="hidden";
                            if(inputs[cont].disabled==false){
                                inputs[cont].disabled=true;
                            }
                        }
                    }

                    linkUpdate.className='show';
                    linkRemove.className='show';
                    tds[lenTds-2].className='hidden';
                } else {

                    console.log("Ocorreu erro no processamento dos dados no servidor: ",http.responseText);
                }   
            }
        }
    });  

}

function remove(index,name,link){

     const http = new XMLHttpRequest();

     http.open("POST",link,true);
     http.setRequestHeader('Content-Type','application/json'); 


     dataToSend = JSON.stringify({name:name});

     http.send(dataToSend); 
     http.onload = ()=>{ 
         let tr = document.querySelector(`table#list > tbody > tr[data-index-row='${index}']`);

         if (http.readyState === 4 && http.status === 200) {
             tr.remove();
             console.log(`Item ${index} removido com sucesso!`);

         } else {
             console.log(`Erro durante a tentativa de remoção do usuário: ${name}! Código do Erro: ${http.status}`); 
         }


     }
 }

 function add(link){
    let inputs = document.querySelectorAll(`input[data-ind='cadinp']`);

    if(valiDados(inputs)){

        const http = new XMLHttpRequest();
        let data = {name:"",email:"",address:"",age:"",height:"",vote:""};
        let dataToSend;

        http.open("POST",link,true);

        http.setRequestHeader('Content-Type','application/json');

        data.name = inputs[0].value;
        data.email = inputs[1].value;
        data.address = inputs[2].value;
        data.age = inputs[3].value;
        data.height = inputs[4].value;
        data.vote = inputs[5].value;

        dataToSend = JSON.stringify(data);

        http.send(dataToSend);
        http.onload = ()=> {
            if (http.readyState === 4 && http.status === 200){
                console.log("Usuário cadastrado: " + data.name);
                alert("Usuário cadastrado: " + data.name)
            }
        }
    }
}

function lista(link){
    const http = new XMLHttpRequest();

    http.open("GET",link,true);

    http.setRequestHeader('Content-Type','application/json');

    http.send();

    http.onload = ()=>{
        if (http.readyState === 4 && http.status === 200) {
            let lista = JSON.parse(http.response);
            criaTabela(lista);
        }
    }

}

function criaTabela(lista){
    let table = document.getElementById("lista");
    let trs = document.querySelectorAll("table#lista>tr");

    if(trs.length > 0){
        for(let i = 0; i<trs.length; i++){
            trs[i].remove();
        }
    }

    for (let i = 0; i < lista.length; ++i) {
        keys = Object.keys(lista[i]);
        let row = document.createElement('tr');
        
        for (let j=0;j<6;j++){
            let newCell =  row.insertCell(j);
            newCell.innerHTML = '<span>'+lista[i][keys[j]]+'</span>';
        }
        table.appendChild(row);
    }
}

function valiDados(inputs){
    let data = {name:"",email:"",address:"",age:"",height:"",vote:""};

    data.name = inputs[0].value;
    data.email = inputs[1].value;
    data.address = inputs[2].value;
    data.age = inputs[3].value;
    data.height = inputs[4].value;
    data.vote = inputs[5].value;

    for(let i=0; i<6; i++){
        if(inputs[i].value == ""){
            alert("Algum campo não foi preenchido.");
            return false;
        }
    }

    if(data.email.search("@") == -1 || data.email.search("@") == data.email.length -1){
        alert("Email inválido.");
        return false;
    }

    if(data.age < 0 || data.age > 130){
        alert("Idade inválida.");
        return false;
    }

    if(data.height < 0.10 || data.height > 2.80){
        alert("Altura inválida.")
        return false
    }

    if(data.vote == "sim" || data.vote == "SIM" || data.vote == "Sim" || data.vote == "sIm" || data.vote == "siM" || data.vote == "SIm" || data.vote == "sIM" || data.vote == "SiM"){
        inputs[5].value = true;
    } else if(data.vote == "não" || data.vote == "NÃO" || data.vote == "Não" || data.vote == "nÃo" || data.vote == "nãO" || data.vote == "NÃo" || data.vote == "nÃO" || data.vote == "NãO" || data.vote == "nao" || data.vote == "NAO" || data.vote == "Nao" || data.vote == "nAo" || data.vote == "naO" || data.vote == "NAo" || data.vote == "nAO" || data.vote == "NaO"){
        inputs[5].value = false;
    } else {
        alert("Campo de votação inválido.");
        return false
    }

    return true;
}

function destBtn(btn){
    let lis = document.querySelectorAll("ul>li");

    for(let i =0; i < as.length; i++){
        if(i == btn){
            lis[i].className("nav-item active");
        } else{
            lis[i].className("nav-item active");
        }
    }
}

window.onload = ()=>{
    let lis = document.querySelectorAll("nav>div>ul>li");
    
    for(let i = 0; i < lis.length; i++){
        lis[i].classList.remove("active");
    }

    if(window.location.pathname == "/"){
        lis[0].classList.add("active");
    } else if(window.location.pathname == "/cadastro"){
        lis[1].classList.add("active");
    } else if(window.location.pathname == "/lista"){
        lis[2].classList.add("active");
    } else if(window.location.pathname == "/about"){
        lis[3].classList.add("active");
    }
}