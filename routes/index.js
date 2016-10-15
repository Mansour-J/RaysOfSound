var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var passwordHash = require('password-hash');
var nodemailer = require('nodemailer');
var helper = require('../lib/helper');


/* GET home page. */
router.get('/', function(req, res, next) {
    db.Category.findAll({
        order: 'id ASC'
      }).then(function(categories){
        res.render('home.ejs', { title: 'Rays of Sound', data: categories, user: req.user});
    });
});

//No Item Route
router.get('/noItem', function(req, res, next){
    res.render('noItem');

    console.log("======================== HERE BEFORE ERROR ===================");
});

//Contact Us Routes
router.get('/contactus', function(req, res, next){
    db.Category.findAll({
        order: 'id ASC'
      }).then(function(categories){
        res.render('contactus.ejs', { title: 'Contact Us', user: req.user, data: categories});
    });
});


//Route to handle a user using the contact us form. This sends an email to the specified user (Balint) with the message given in the form
router.post('/contactus/', function(req, res, next){
    db.Category.findAll({
        order: 'id ASC'
      }).then(function(categories){
        //res.render('contactus.ejs', { title: 'Express', user: req.user, data: categories});

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'swen302raysofsound@gmail.com',
                pass: 'raysofsound'
            }
        });


        var from = "" + req.body.first_name + " " + req.body.last_name +  " <" +  req.body.email + "> ";

        var mailOptions = {

            from: 'Rays of sound user contact<swen302raysofsound@gmail.com>',
            to: 'ENTER EMAIL HERE', // Bailants email
            subject: 'Contact Us',
            text: 'You have a contact us email with the following details... ',
            html: '<div style="border: 5px solid #e5e8ff;border-top: 20px solid #e5e8ff !important; padding: 20px 0px 0px 10px; border-radius: 5px;">' +
            '<p> You have a <strong> contact us  </strong> email with the following details...  </p>'+
            '<p> <strong> Name: </strong> ' +  req.body.first_name + " " + req.body.last_name  + '</p>'+
            '<p> <strong> Email: </strong> ' +  req.body.email + '</p>'+
            '<p> <strong>Message:</strong> <br>' +  req.body.comment  + '</p>'+

            '</div>'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                res.redirect('/');
            } else {
                console.log('Message Sent: '+info.response);
                res.redirect('/');
            }
        });


    });
});

//Route to the login page so the user can access admin features
router.get('/login', function(req, res, next){
    db.Category.findAll({
        order: 'id ASC'
      }).then(function(categories){
            res.render('login.ejs', {title:'Login', data: categories, user: req.user});
    });
});


/* GET users listing. */
//Registration Route
router.post('/registration', helper.authedOrLogin, function(req, res, next){
    var hashedPassword = passwordHash.generate(req.body.password1);

    db.User.create({
        username: req.body.username,
        role: "normalUser",
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword
    }).then(function (){
        //successfull
        db.User.findAll().then(function (users) {
            res.redirect('/');
        });
    })
});



//Registration Route url kept a secret so that if needed later on in the project we can add more 
router.get('/kadgnkauadf33321866mnpqwr', helper.authedOrLogin, function(req, res, next){ 
    db.Category.findAll({
        order: 'id ASC'
      }).then(function(categories){
        res.render('registration.ejs', { title: 'Registration', user: req.user, data: categories});
    });
});

//Logout of the site, destroys the session 
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});


//404 Routes
router.get('*', function(req, res, next){
    res.statusCode = 404;
    // res.send('None shall pass');
    res.render('404.ejs', { title: 'Express' });
});

module.exports = router;