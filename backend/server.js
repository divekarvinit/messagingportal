var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');

var bodyParser = require('body-parser');
var messages = [{text:'Some Text', owner:'Tim'},{text:'Some Text 2', owner:'John'}];
var users = [{firstName:'Vinit', lastName: 'Divekar', email:'divekarvinit@gmail.com', password : 'test', id : '0'}];
app.use(bodyParser.json({type:'application/json'}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

var api = express.Router();
var auth = express.Router();

api.get('/messages', (req, res) => {
    res.json(messages);
});

api.get('/messages/:user', (req, res) => {
    var user = req.params.user;
    var result = messages.filter(abc => abc.owner == user);
    res.json(result);
});

api.post('/messages', (req, res) => {
    console.log(req.body);
    messages.push(req.body);
    res.json(req.body);
});

api.get('/users/me', checkAuthenticated, (req, res) => {

    // checkAuthenticated method is called before the middleware is executed.
    console.log(users[req.user]);
    res.json({user : users[req.user]});
});

api.post('/users/me', checkAuthenticated, (req, res) => {

    // checkAuthenticated method is called before the middleware is executed.
    var user =  users[req.user];

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;

    users[req.user] = user;
    res.json(user);
    
});

auth.post('/login', (req, res) => {
    var user = users.find(user => user.email == req.body.email);
    if(!user){
        sendAuthError(res);
    }
    if(user.password == req.body.password){
        sendToken(user, res);
    } else {
        sendAuthError(res);
    }
});

auth.post('/register', (req, res) => {
    var userIndex = users.push(req.body) - 1;
    var user = users[userIndex];
    user.id = userIndex;
    // 123 is a secret of token. Production environment 
    // will have it from configuration file.
    var token = jwt.sign(user.id, '123');
    sendToken(user, res);
});

function sendAuthError(res){
    res.json({success : "false", message : "Email or password is incorrect."});
}

function sendToken(user, res){
    var token = jwt.sign(user.id, '123');
    res.json({firstName : user.firstName, token});
}

function checkAuthenticated(req, res, next) {
    if(!req.header('authorization')) {
        res.status(401).send({message : 'Unauthorised request!'});
    }

    var authorizationHeader = req.header('Authorization')
    var token = authorizationHeader.split(' ')[1];
    
    var userId = jwt.decode(token, '123');
    if(!userId) {
        res.status.send({message : "Unauthorised Request. Invalid Header!"})
    }
    
    req.user = userId; // Because of this technique it can be used in any reqest.
    next();
}

app.use('/api', api);
app.use('/auth', auth);

app.listen(63145);
