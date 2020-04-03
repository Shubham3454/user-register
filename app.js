process.env.NODE_CONFIG_DIR = 'config/';

const express     = require('express')
const config      = require('config')
const http        = require('http')
const bodyParser  = require('body-parser')
const RateLimit   = require('express-rate-limit')
const MongoClient = require('mongodb').MongoClient;
const helmet      = require('helmet')


const app           = express();
app.use(helmet());
      global.app    = app;
      global.config = config;

const limiter = new RateLimit( {
    windoMs: 1*60*1000,   // 1 mint
    max    : 100,
    delay  : 0
});

app.use(limiter);
app.set('port', process.env.PORT || config.PORT);

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT , DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var client = require('./client');

app.use('/fe', client)

require('./routes/register');


http.createServer(app).listen(app.get('port'), function () {
    startInitialProcess()
});


function startInitialProcess() {
    let db ='';
    console.error(' Express server listening on port ', app.get('port'), "Env ", app.get('env') , ' ///////////////');
    MongoClient.connect(config.get('databaseSettings.mongo_db_connection') ,{ useUnifiedTopology: true }, function (err, client) {
        if (err) {
            throw err;
        }
        db = client.db('test');
        global.db    = db;
    });
}

