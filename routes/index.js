var express = require('express');
var router = express.Router();
var ModelUser = require('models/user');
var ModelReservation = require('models/reservation');
const token = "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"
var sess;




/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Seu Traje',
        user: (req.session && req.session.user ? req.session.user : null)
    });
});

/* GET Cadastro */
router.get('/cadastro', function(req, res, next) {
    res.render('cadastro', {
        title: 'Seu Traje - Cadastro',
        user: (req.session && req.session.user ? req.session.user : null)
    });
});

/* GET Traje*/
router.get('/traje', function(req, res, next) {

    if (req.session && req.session.user) {
        res.render('traje', {
            title: 'Seu Traje - Trajes',
            user: (req.session && req.session.user ? req.session.user : null)
        });
    } else {
        res.redirect('login')
    }

});
/* GET Traje1*/
router.get('/traje1', function(req, res, next) {

    if (req.session && req.session.user) {
        res.render('traje1', {
            title: 'Seu Traje - Trajes',
            user: (req.session && req.session.user ? req.session.user : null)
        });
    } else {
        res.redirect('login')
    }
});
/* GET Traje2*/
router.get('/traje2', function(req, res, next) {
    if (req.session && req.session.user) {
        res.render('traje2', {
            title: 'Seu Traje - Trajes',
            user: (req.session && req.session.user ? req.session.user : null)
        });
    } else {
        res.redirect('login')
    }
});

/* GET Traje3*/
router.get('/traje3', function(req, res, next) {
    if (req.session && req.session.user) {
        res.render('traje3', {
            title: 'Seu Traje - Trajes',
            user: (req.session && req.session.user ? req.session.user : null)
        });
    } else {
        res.redirect('login')
    }
});
/* GET Traje4*/
router.get('/traje4', function(req, res, next) {
    if (req.session && req.session.user) {
        res.render('traje4', {
            title: 'Seu Traje - Trajes',
            user: (req.session && req.session.user ? req.session.user : null)
        });
    } else {
        res.redirect('login')
    }
});
/* GET Traje5*/
router.get('/traje5', function(req, res, next) {
    if (req.session && req.session.user) {
        res.render('traje5', {
            title: 'Seu Traje - Trajes',
            user: (req.session && req.session.user ? req.session.user : null)
        });
    } else {
        res.redirect('login')
    }
});
/* GET Traje6*/
router.get('/traje6', function(req, res, next) {
    if (req.session && req.session.user) {
        res.render('traje6', {
            title: 'Seu Traje - Trajes',
            user: (req.session && req.session.user ? req.session.user : null)
        });
    } else {
        res.redirect('login')
    }
});


/* GET Contato */
router.get('/contato', function(req, res, next) {
    res.render('contato', {
        title: 'Seu Traje - Contato',
        user: (req.session && req.session.user ? req.session.user : null)
    });
});
/* GET Login */
router.get('/login', function(req, res, next) {
    console.log('req.session', req.session)

    res.render('login', {
        title: 'Seu Traje - Login',
        logged: (req.session && req.session.user ? true : false),
        sess: req.session,
        user: (req.session && req.session.user ? req.session.user : null)
    });
});
router.get('/reserva', function(req, res, next) {
    if (req.session && req.session.user) {

        ModelReservation.find({
            user: req.session.user._id,
        }, function(err, result) {
            if (result) {
                res.render('reserva', {
                    title: 'Seu Traje - Reserva',
                    user: (req.session && req.session.user ? req.session.user : null),
                    reservations: result
                });

            } else if (err) {
                res.status(500).json(err)
            } else if (!result) {
                res.render('reserva', {
                    title: 'Seu Traje - Reserva',
                    user: (req.session && req.session.user ? req.session.user : null),
                    reservations: result
                });
            }
        })

    } else {
        res.redirect('login')
    }
});


/* POST Login */
router.post('/login', function(req, res, next) {
    sess = req.session;
    console.log("req.body", req.body)
    ModelUser.findOne({
        email: req.body.email,
        password: req.body.password
    }, function(err, result) {
        if (result) {
            sess.user = result
            res.redirect('/login')
        } else if (err) {
            res.status(500).json(err)
        } else if (!result) {
            res.status(404).json(result)
        }
    })
});

/* POST Login */
router.get('/logout', function(req, res, next) {
    sess = req.session;
    sess.user = null
    res.redirect('/')
});



/* POST Login */
router.get('/confirma/:id', function(req, res, next) {
    ModelUser.findOne({
        _id: req.params.id
    }, function(err, user) {
        if (err) {
            res.status(500).json(err)
        } else if (result) {
            result.confirmedEmail = true;
            result.save(function(err, savedResult) {
              res.render('confirma', {
                  title: 'Seu Traje - confirma',
                  user: (req.session && req.session.user ? req.session.user : null),
                  reservations: result
              });
            })
        }
    })
});





router.post('/cadastro', function(req, res, next) {
    console.log(req.body)

    var model = new ModelUser()
    model.name = req.body.name
    model.email = req.body.email
    model.birthdate = req.body.birthdate
    model.cellphone = req.body.cellphone
    model.sex = req.body.sex
    model.password = req.body.password
    console.log("chegay")
    model.save(function(err, result) {
        if (req.session.user) {
            console.log(err)
            res.status(500).json(err)
        } else if (result) {

            // using SendGrid's v3 Node.js Library
            // https://github.com/sendgrid/sendgrid-nodejs
            var helper = require('sendgrid').mail;

            from_email = new helper.Email("seutraje@gmail.com");
            to_email = new helper.Email(result.email);
            subject = "Seu traje - Novo Cadastro";
            content = new helper.Content('text/html', "<h3>Olá," + result.name + "</h3><br> você foi cadastrado no <strong>Seu traje</strong>, para verificar o seu email, clique no botão abixo<br><br><br><a href='http://138.197.115.28/confirma/'" + result._id + "'>confirmar</a>");
            mail = new helper.Mail(from_email, subject, to_email, content);

            var sg = require('sendgrid')(token);
            var request = sg.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: mail.toJSON()
            });

            sg.API(request, function(error, response) {
                console.log(response.statusCode);
                console.log(response.body);
                console.log(response.headers);
            })
            console.log(result)
            res.status(200).json(result)
        }

    })
});

router.post('/reserva', function(req, res, next) {
    console.log(req.body, req.session.user)
    var model = new ModelReservation()
    model.size = req.body.size
    model.price = req.body.price
    model.id = req.body.id
    model.user = req.session.user._id
    model.name = req.body.name
    model.image = req.body.image
    console.log("chegay")
    model.save(function(err, result) {
        if (err) {
            console.log(err)
            res.status(500).json(err)
        } else if (result) {


            //enviar email para usuário
            var helper = require('sendgrid').mail;
            from_email = new helper.Email("seutraje@gmail.com");
            to_email = new helper.Email(req.session.user.email);
            subject = "Seu traje - Nova Reserva";
            content = new helper.Content('text/html', "<h3>Olá," + req.session.user.name + " Nova reserva efetuada no <strong>Seu traje</strong></h3><br/><h3>Traje:" + result.name + "</h3>" + "<br/><h3>Tamanho:" + result.size + "</h3>" + "<br/><h3>Preço:" + result.price + "</h3>");
            mail = new helper.Mail(from_email, subject, to_email, content);

            var sg = require('sendgrid')(token);
            var request = sg.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: mail.toJSON()
            });

            sg.API(request, function(error, response) {
                console.log(response.statusCode);
                console.log(response.body);
                console.log(response.headers);
            })
            console.log(result)
            res.status(200).json(result)



            //enviar email para loja

            from_email_admin = new helper.Email("seutraje@gmail.com");
            to_email_admin = new helper.Email("seutraje@gmail.com");
            subject_admin = "Seu traje - Nova Reserva de" + req.session.user.name;
            content_admin = new helper.Content('text/html', "Nova reserva efetuada por <strong> [" + req.session.user.name + "]" + req.session.user.email + "</strong></h3><br/><h3>Traje:" + result.name + "</h3>" + "<br/><h3>Tamanho:" + result.size + "</h3>" + "<br/><h3>Preço:" + result.price + "</h3>");
            mail_admin = new helper.Mail(from_email_admin, subject_admin, to_email_admin, content_admin);

            var sg = require('sendgrid')(token);
            var request = sg.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: mail_admin.toJSON()
            });

            sg.API(request, function(error, response) {
                console.log(response.statusCode);
                console.log(response.body);
                console.log(response.headers);
            })

        }

    })
});



module.exports = router;
