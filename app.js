var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var expressSession = require('express-session');
var passport = require('passport');
var expressValidator = require('express-validator');
var localStratgy = require('passport-local').Strategy;
var multer = require('multer');
var upload = multer({ dest: './uploads' }); //app.use(multer({dest: './uploads'}));
var flash = require('connect-flash');


var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passwordHash = require('password-hash');
var session = require('express-session');


var expressValidator = require('express-validator');
var multer = require('multer');
var upload = multer({ dest: './uploads' }); //app.use(multer({dest: './uploads'}));
var flash = require('connect-flash');

var db = require('./lib/db');
var app = express();


//passport
app.use(passport.initialize());
app.use(passport.session());

//validator
// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

/// Express Messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

var routes = require('./routes/index');
var users = require('./routes/users');
var manage = require('./routes/manage');
var item = require('./routes/item');
var category = require('./routes/category');
var admin = require('./routes/admin');
var additem = require('./routes/additem');

//Passport code for user sessions

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(obj, done) {
    db.User.findById(obj).then(function(user){
        done(null, user);
    }).error(function(err){
        done(err, null);
    });
});


passport.use(new LocalStrategy({
        usernameField: 'username'
    },
    function(username, password, done){
        db.User.find({
          where: {
            username: username
          }
        }).then(function (user, err){
            if (!user) {
                return done(null, false, {message: 'Unknown user'});
            }
            else if(!passwordHash.verify(password, user.password)) {
                return done(null,false, {message: 'Incorrect password'});
            }
            return done(null, user);
        });
    }
));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var sessionConf = {
    secret: 'catty',
    name: 'token',
    resave: true,
    saveUninitialized: true
};

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConf));
app.use(passport.initialize());
app.use(passport.session());


app.use('/users', users);
app.use('/manage', manage);
app.use('/item', item);
app.use('/category', category);
app.use('/admin', admin);
app.use('/additem', additem);
app.use('/', routes);   // MUST COME LAST AS HAS 404


app.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/',
    }),
    function(req, res) {
        //res.redirect('/category/1/view');
        res.redirect('/admin');
    });

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('404', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




module.exports = app;