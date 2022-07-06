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
