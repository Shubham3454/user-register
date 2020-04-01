process.env.NODE_CONFIG_DIR = 'config/';

const express     = require('express')
const config      = require('config')
const http        = require('http')
const bodyParser  = require('body-parser')
const MongoClient = require('mongodb').MongoClient;


const app           = express();
      global.app    = app;
      global.config = config;
console.log("config is ", config.get("PORT"))

app.set('port', process.env.PORT || config.PORT);

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT , DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

require('./routes/register');


http.createServer(app).listen(app.get('port'), function () {
    startInitialProcess()
});


function startInitialProcess() {
    let db ='';
    console.error(' Express server listening on port ', app.get('port'), "Env ", app.get('env') , ' ///////////////');
    MongoClient.connect(config.get('databaseSettings.mongo_db_connection') ,{ useUnifiedTopology: true }, function (err, client) {
        if (err) {
            console.log("@@@@@@@@@@@",err)
            throw err;
        }
        db = client.db('test');
        global.db    = db;
    });
}

