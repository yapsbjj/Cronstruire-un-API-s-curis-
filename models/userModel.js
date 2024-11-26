const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Veuillez entrer une adresse email valide.']
    }
});

// Ajouter le plugin de Passport-Local-Mongoose pour gérer le mot de passe
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);

