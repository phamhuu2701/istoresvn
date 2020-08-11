const createError = require('http-errors');
const express = require('express');
const path = require('path');
//const csrf      = require('csurf');
//const cors      = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const config = require('config');
require('events').EventEmitter.defaultMaxListeners = 15;

const indexRouter = require('./server/routes/index');
const databaseRouter = require('./server/routes/database');
const loginRouter = require('./server/api/login');
const logoutRouter = require('./server/api/logout');
const citiesRouter = require('./server/api/cities.api');
const districtsRouter = require('./server/api/districts.api');
const streetsRouter = require('./server/api/streets.api');
const authorizationsRouter = require('./server/api/authorizations.api');
const usersRouter = require('./server/api/users.api');
const productCategoriesRouter = require('./server/api/productCategories.api');
const productsRouter = require('./server/api/products.api');
const storeCategoriesRouter = require('./server/api/storeCategories.api');
const storesRouter = require('./server/api/stores.api');
const viewRouter = require('./server/api/view.api');
const departmentsRouter = require('./server/api/departments.api');
const employeesRouter = require('./server/api/employees.api');
const searchKeysRouter = require('./server/api/searchKeys.api');

var app = express();
const port = process.env.PORT || 5000;

// Write logger by morgan module
const fs = require('fs');
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    {
        flags: 'a'
    }
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(logger("combine"/*, {stream: accessLogStream}*/));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// let mongoDBUri = process.env.NODE_ENV === 'production' ? 'mongoDBUri' : 'localMongoDBUri';
let mongoDBUri = 'mongoDBUri';
// Connect to MongoDB
mongoose.connect(config.get(mongoDBUri), {
    // mongoose.connect(config.get('localMongoDBUri'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(
    session({
        secret: 'my secret',
        resave: true,
        saveUninitialized: false,
        cookie: {
            //maxAge: 30000,
            sameSite: true,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        },
        store: new MongoStore({ mongooseConnection: mongoose.connection })
        // store: new MongoStore({
        //     url: mongoDBUri,
        //     autoRemove: 'interval',
        //     autoRemoveInterval: 0.005 * 3600
        // })
    })
);

//app.use('/', indexRouter);
app.use('/create-database', databaseRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/users', usersRouter);
app.use('/api/cities', citiesRouter);
app.use('/api/districts', districtsRouter);
app.use('/api/streets', streetsRouter);
app.use('/api/authorizations', authorizationsRouter);
app.use('/api/products', productsRouter);
app.use('/api/product-categories', productCategoriesRouter);
app.use('/api/stores', storesRouter);
app.use('/api/store-categories', storeCategoriesRouter);
app.use('/api/view', viewRouter);
app.use('/api/departments', departmentsRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/search-keys', searchKeysRouter);

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
    app.use(express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

//app.use(cors());
//app.use(csrf({cookie: false}));

/*app.all('*', function (req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken())
    res.render('index')
})*/

// Use to build RESTFUL API: exchange data
// CORS: Cross-Origin Resource Sharing: because different service or different domain
/*app.use((req, res, next) => {
    // Allow domains name access own website and sharing data
    res.setHeader('Access-Control-Allow-Origin', '*'); // domains name
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type, X-Access-Token, X-Requested-With');
    next();
})*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('Server Error!');
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('Database connected');

    app.listen(port, () => {
        console.log('Server starting..');
    });
});
