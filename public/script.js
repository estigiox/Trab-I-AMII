let cadastro;

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
            console.log("usuário adicionado.");
            location.reload(true);
        }
    }
 }

 function list(){
    //fazer em casa. Lista de usuários.

    //Primeira parte: envia mensagem para o servidor pedindo uma listagem dos usuários

    //Segunda parte: apos recebimento da lista de usuarios, no formato JSON, colocar os usuarios na interface
    let tableList = document.getElementById("list");

    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let span = document.createElement("span");
    let cont;
    //for(let cont=0;cont<datas.length;cont++){ 
        td.setAttribute(`data-index-row=${cont}`);
        span.innerHTML =  Object.keys(datas[cont])[0] //keys 0 - name, 1 - email
        span.className="show";
        td.appendChild(span);
        tr.appendChild(td);
        
        tableList.appendChild(tr);
    //}
}