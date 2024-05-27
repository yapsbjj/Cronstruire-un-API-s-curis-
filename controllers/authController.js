const passport = require('passport');
exports.login = (req, res) => {
    const { username, password } = req.body;

    if (username === 'yassine' && password === 'DjangoLePython') {
        res.redirect('/dashboard');
    } else {
        res.send('Identifiants de connexion incorrects');
    }
};


exports.login = passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
});

