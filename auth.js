const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const fs = require("fs");

/* var senhaParaSalvar = bcrypt.hashSync('', 10)
console.log(senhaParaSalvar);*/

module.exports = function(passport){
    fs.readFile("./usuarios.json" , "utf8", function(err, data){
        if(err){
            return console.log("Erro ao ler arquivo");
        }
        
        var jsonData = JSON.parse(data); // faz o parse para json
            //set the passport
                function findUser(username){
                    return jsonData.users.find(user => user.username === username);
                }
                function findUserById(id){
                    return jsonData.users.find(user => user._id === id);
                }
            
                passport.serializeUser((user, done) => {
                    done(null, user._id);
                });
                passport.deserializeUser((id, done) => {
                    try {
                        const user = findUserById(id);
                        done(null, user);
                    } catch (err) {
                        done(err, null);
                    }
                });
            
                passport.use(new LocalStrategy({
                    usernameField: 'username',
                    passwordField: 'password'
                }, 
                (username, password, done) => {
                    try{
                        const user = findUser(username);
                        if(!user) return done(null, false);
                        const isValid = bcrypt.compareSync(password, user.password);
                        if(!isValid) return done(null, false);
                        return done(null, user);
                    } catch (err) {
                        console.log('passport.use(new LocalStrategy): ' + err);
                        return done(err, false);
                    }
                }));
        //}
    })
}

/* const senhaParaSalvar = bcrypt.hashSync('SENHA', 10);
console.log(senhaParaSalvar); */
/* 
const users = [
    {
    _id: 1,
    username: 'teste',
    password: '$2a$06$HT.EmXYUUhNo3UQMl9APmeC0SwoGsx7FtMoAWdzGicZJ4wR1J8alW'
    },
    { _id: 2, username: "socios", password: "$2a$10$KcCGq8QgXL123JzTPNdFxOfvaqQK7imYQdCiDT1TKYnPf/BAGIrlK"},
    { _id: 3, username: "ceo-tahech", password: "$2a$10$L83ZHxpMFkVI7IOlO41ZZuMBPn.ReYyJBiYMWrkMDnlns/xUp.fxW"},
    { _id: 4, username: "ceo-vuello", password: "$2a$10$tajF6BcL5P43CPJTuEUn6./tUgbya8ImognNDsu5q3upM2nVK95Ei"},
    { _id: 5, username: "tecnologia", password: "$2a$10$KCTGvNBJSj/BoZXWzzSd0uRCIdf1nIDGO7x0FknECEDhGiW8hHZ4G"},
    { _id: 6, username: "expansao", password: "$2a$10$T28rWUdYuNmOLu8kZM7WSeiy3EzwdcJdPR8bjl130fkeF2ag6rhIm"},
    { _id: 7, username: "licitacoes", password: "$2a$10$vhkClgZIGhh5FK9QSuGpRerIjxEQrlwgbiHIKmc28qzR3tYELS91m"},
    { _id: 8, username: "leiloes-judiciais", password: "$2a$10$iFqzmAhQUIcavgkUUAfdSulJUrhXDDseVhHZ4aMSxG4JnI6AEGqWK"},
    { _id: 9, username: "financeiro", password: "$2a$10$hH4MvLXdd7l.kXbgqsOtZ.NkkcKEOQpTfEeB./oN2Kwl2bfxlnlhW"},
    { _id: 10, username: "administrativo", password: "$2a$10$t.WnUxfNoX9ckdPMwDLO5u5Gfp.fgLxxFg5r/GNAvuCfHL.Wcr3Ke"},
    { _id: 11, username: "tributario", password: "$2a$10$Hl89kTXmMzztb/ssTduGWuyhhkcrlYdg9WQC4lAv4ccYXiqi/tLdy"},
    { _id: 12, username: "controladoria", password: "$2a$10$5KTCVllP2LbsXLkHObhGzuzL8dJRidKMCwVYybf3A0hNXBlJIPFPW"},
    { _id: 13, username: "comercial", password: "$2a$10$.6rOiD35omHdtEDNFBm0HOdaffDdfV6A37/L0OjmnlKL33N3zXyiq"}
]

module.exports = function(passport){ //set the passport
    function findUser(username){
        return users.find(user => user.username === username);
    }
    function findUserById(id){
        return users.find(user => user._id === id);
    }

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
        try {
            const user = findUserById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, 
    (username, password, done) => {
        try{
            const user = findUser(username);
            if(!user) return done(null, false);
            const isValid = bcrypt.compareSync(password, user.password);
            if(!isValid) return done(null, false);
            return done(null, user);
        } catch (err) {
            console.log('passport.use(new LocalStrategy): ' + err);
            return done(err, false);
        }
    }));

} */