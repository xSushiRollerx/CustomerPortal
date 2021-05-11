var verification = require('./verification');
var http = require('http');
var express = require('express');
var app = express();

const host = 'localhost';
const port = 8000;

app.get('/verify', function (req, res){
    res.writeHead(200); //sets status code
    res.end("Testing server");
    let to = req.params('email');
    let code = req.params('verification_code');
    if(to && code){
        verification.setMailOptions(email, code);
        verification.sendVerificationMail();
    }
    req.writeEnd("Not acceptable");
});

const server = http.createServer(requestListener);
server.listen(port, host, ()=>{
    console.log('Server is running on http://localhost:8000');
    verification.setMailOptions('dyltrashs@gmail.com','testing');
});