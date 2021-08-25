const express = require("express");
const router = express.Router();
const app = express();

// const faker = require("faker");

// let db = require("./db");
//db.criarDB("minhaBaseDados");
//Especifica a pasta contendo arquivos estáticos. 
//O nome 'public' não precisará ser colocado na rota 
//Para serem alcançados os arquivos e pastas que estão dentro dele. 
//Por isso na imagem que está na página home.ejs só há o indicativo para 'images'
router.use(express.static('public'));



//Exemplode Rotas: 
/*
http://localhost:3030/css
http://localhost:3030/images
http://localhost:3030/index.html
/ = http://localhost:3030/
/about = http://localhost:3030/about
/curriculo =  http://localhost:3030/cadastro
*/
router.get('/',(req,res)=>{
    res.render('pages/home');
});

router.get('/about',(req,res)=>{

res.render('pages/about');
});

router.post('/cadastro/remove',(req,res)=>{
    let usuario={name: "wellington", email: "wwagner@virtual.ufc.br"};
    /* for(let cont=1;cont<=6;cont++){
        usuarios.push({name:faker.name.findName(),email: faker.internet.email(),avatar: faker.image.image()});
    } */
    let result = db.inserirDado(usuario);
    console.log(result);
    //res.render('pages/insert',{result});
});

router.get('/cadastro',(req,res)=>{
    res.render('pages/cadastro');
});

router.get('/cadastro/insert',(req,res)=>{
    let usuario={name: "wellington", email: "wwagner@virtual.ufc.br"};
    /* for(let cont=1;cont<=6;cont++){
        usuarios.push({name:faker.name.findName(),email: faker.internet.email(),avatar: faker.image.image()});
    } */
    let result = db.inserirDado(usuario);
    console.log(result);
    //res.render('pages/insert',{result});
});
<<<<<<< Updated upstream
router.get('/cadastro/list',(req,res)=>{
=======

router.post('/cadastro/add',(req,res)=>{
    let user = {name:"",email:"",address:"",height:"",age:"",vote:""};

    user.name = req.body.name;
    user.email = req.body.email;
    user.address = req.body.address;
    user.height = req.body.height;
    user.age = req.body.age;
    user.vote = req.body.vote;

    users.push(user);
    console.log("Usuário cadastrado: ",user);

    // res.status(200).json({
    //     status:'sucess',
    //     data: `Usuário ${user} foi adiocionado com sucesso!`
    // });
    res.sendStatus(200);
>>>>>>> Stashed changes
});
//Essa linha permite que este código seja exportado como um módulo e possa ser usado em outras partes da aplicação.
module.exports = router;