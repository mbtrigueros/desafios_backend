const usuarioController = {
    login: (req, res) => {
        if (!req.body.userName || !req.body.password){
            res.send("Por favor ingrese usuario y contraseña");
        }
        else {
            console.log("Entraste al login" );
            req.session.userName = `${req.body.userName}`;
            console.log('Session: ', req.session);
            res.redirect('http://localhost:8080/mensajes');
        }
            
    },
    logout: (req, res) => {
        console.log("Entraste al logout");
        req.session.destroy()
        res.redirect('http://localhost:8080/mensajes');
    },

}

module.exports = usuarioController;


