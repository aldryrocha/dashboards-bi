const express = require('express');
const router = express.Router();
const passport = require('passport');
//const controller = require('../controllers/userController');

router.get('/', (req, res, next) =>{
    if(req.query.fail)
        res.render('login', {message: 'Usuário e/ou senha inválidos'});
    else 
        res.render('login', {message: null});
})

router.post('/', passport.authenticate('local', {
    
    successRedirect: '/dashboard',
    failureRedirect: '/login?fail=true'
})) 

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
  });
/* router.post('/', function(req, res, next) {
passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login?fail=true'); }
    return res.redirect('/users/'+ req.body.username);
    })(req, res, next);
}); */

module.exports = router;