const User = require("../models/users.js");
const bcrypt = require("bcrypt");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}


passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser((email, done) => {
    let user = User.findOne({ email: email });
    done(null, user);
});



passport.use('login', new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password',
    passReqToCallback: true
},
    function (req, userName, password, done){
        User.findOne({ email: userName},
            (err, user) => {
                if (err){
                    return done(err);
                }
                if(!user){
                    console.log("No existe un usuario con el nombre ", userName);
                    return done (null, false, console.log('message', "Usuario no encontrado"));
                }
                if(!isValidPassword(user, password)){
                    console.log("Contraseña inválida");
                    return done (null, false, console.log('message', "Contraseña inválida"));
                }
                if(user){
                    req.session.userName = `${req.body.userName}`;
                }
                console.log(user);
                return done(null, user);
            })
    }
)
);

passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    function (req, email, password, done){
        User.findOne({ email: email},
                (err, user) => {
                    if (err){
                        console.log("Error en el registro");
                        return done(err);
                    }
                    if(user){
                        console.log("Ya existe un usuario con ese ", email);
                        return done (null, false, console.log('message', "El usuario ya existe"));
                    }
                    else {
                        let user = {
                            ...req.body, 
                            password: createHash(password)
                        }
                    User.create(user)
                    console.log(user);
                    return done(null, user);
                    }
                })
            }
        )   
    );

const usuarioController = {
    failedLogin: (req, res) => {
        console.log("Entraste al failedLogin");
        res.render('./partials/failedLogin.hbs', { failedLogin: true, message: 'El login ha fallado' })
    },
    failedRegister: (req, res) => {
        console.log("Entraste al failedRegister");
        res.render('./partials/failedRegister.hbs', { failedRegister: true, message: 'El registro ha fallado' })
    },
    registerView: (req, res) => {
        console.log("Entraste al register");
        res.render('./partials/registerView.hbs', { registerView: true })
    },
    logout: (req, res) => {
        console.log("Entraste al logout");
        req.session.destroy()
        res.redirect('http://localhost:8080/mensajes');
    },


}

module.exports = usuarioController;


