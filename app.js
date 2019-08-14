var express = require('express')
var app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const bookRoutes = require('./api/routes/book');
const pingRoutes = require('./api/routes/ping');
const helloWorldRoutes = require('./api/routes/helloWorld');

mongoose.connect('mongodb://localhostt/receipeBlog', {
    // useMongoClient:true
    useNewUrlParser: true
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

 app.use((req, res, next)=>{
     res.header('Access-Control-Allow-Origin', "*");
        

         res.header(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization' 
    );
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
})

app.use('/book', bookRoutes);
app.use('/ping', pingRoutes);
app.use('/',helloWorldRoutes);


module.exports = app;