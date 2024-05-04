const mongoose = require('mongoose');

// Schéma pour les catways
const catwaySchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['long', 'short'],
    required: true
  },
  catwayState: String
});

// Définition du modèle Catway
const Catway = mongoose.model('Catway', catwaySchema);

//Récupérer tous les catways
const getAllCatways = async () => {
  try {
    const catways = await Catway.find();
    return catways;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des catways');
  }
};

module.exports = { Catway, getAllCatways };
