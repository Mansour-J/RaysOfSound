var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var passwordHash = require('password-hash');
var nodemailer = require('nodemailer');


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.user);
    db.Category.findAll().then(function(categories){
        res.render('home.ejs', { title: 'Rays of Sound', data: categories, user: req.user});
    });
});


//TET Routes
router.get('/test', function(req, res, next){
    db.Category.findAll().then(function(categories){
        res.send(categories);
    });
});

//Contact Us Routes
router.get('/contactus', function(req, res, next){
    db.Category.findAll().then(function(categories){
        res.render('contactus.ejs', { title: 'Contact Us', user: req.user, data: categories});
    });
});


//Contact Us Routes
router.post('/contactus/', function(req, res, next){
    db.Category.findAll().then(function(categories){
        res.render('contactus.ejs', { title: 'Express', user: req.user, data: categories});

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'swen302raysofsound@gmail.com',
                pass: 'raysofsound'
            }
        });


        var from = "" + req.body.first_name + " " + req.body.last_name +  " <" +  req.body.email + "> ";

        var mailOptions = {

            from: 'Mansour Javaher <swen302raysofsound@gmail.com>',
            to: 'javaher.mansour@gmail.com', // Bailants email
            subject: 'Contact US',
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

router.get('/login', function(req, res, next){
    db.Category.findAll().then(function(categories){
            res.render('login.ejs', {title:'Login', data: categories, user: req.user});
    });
})



// //Individual Item Route
// router.get('/individual', function(req, res, next){
//     db.Category.findAll().then(function(categories){
//         res.render('IndividualItem.ejs', { title: 'Express'});
//     });
// });



/* GET users listing. */
//Registration Route
router.post('/registration', function(req, res, next){
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
            res.render('index.ejs', {title: 'Rays of Sound', user: req.user});
        });
    })
});



//Registration Route
router.get('/registration', function(req, res, next){
    db.Category.findAll().then(function(categories){
        res.render('registration.ejs', { title: 'Registration', user: req.user, data: categories});
    });
});


router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

// //Individual Item Route
// router.get('/additem', function(req, res, next){
//     db.Category.findAll().then(function(categories){
//         res.render('addItem.ejs', { title: 'Express', data:categories});
//     });
// });



//404 Routes
router.get('*', function(req, res, next){
    res.statusCode = 404;
    // res.send('None shall pass');
    res.render('404.ejs', { title: 'Express' });
});

module.exports = router;