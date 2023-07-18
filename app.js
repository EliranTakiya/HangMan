const express = require('express');
//const router = require('./routs.js');
const bodyParser = require('body-parser');
const path=require('path');

const { PORT = 3000 } = process.env;
const app = express();

//body parser
//to get data that user send

// app.use(express.json()); 
// app.use(express.urlencoded({extended:true}));

//handle body parsing
app.use(express.json());//for application/json
app.use(express.urlencoded({ extended: true }));//for application/x-www-form-urlencoded

//serve static files
 app.use(express.static(path.join(__dirname,)));// root/public
 console.log(path.join(__dirname));



const logger =  (req, res, next) =>{
    let date = new Date().toLocaleString();
    console.log(date);
    console.log("method: ",req.method);
    console.log("body: ",req.body)

//console.log(req.body);
    next();
}
app.use(logger);

//routing with sendFile method
 app.get('^/$|/index(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'page','index.html'));
 })

//  app.get('^/$|/info(.html)?',(req,res)=>{
//     res.sendFile(path.join(__dirname,'pages','info.html'));
//  })

//  app.get('^/$|directed-page(.html)?',(req,res)=>{
//     res.sendFile(path.join(__dirname,'pages','directed-page.html'));
//  })

 //redirect method
 //redirect back to info
//  app.get('/old-page(.html)?',(req,res)=>{
//     res.redirect(301,'/directed-page.html');
//  });



//app.use('/', router);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})