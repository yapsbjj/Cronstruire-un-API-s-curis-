exports.login = (req, res) => {
    const { username, password } = req.body;

    if (username === 'yassine' && password === 'DjangoLePython') {
        res.redirect('/dashboard');
    } else {
        // Authentification échouée, redirigez l'utilisateur vers une page d'erreur ou affichez un message d'erreur
        res.send('Identifiants de connexion incorrects');
    }
};
