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

const getCatwayById = async (catwayId) => {
  try {
    const catway = await Catway.findById(catwayId);
    return catway;
  } catch (error) {
    throw new Error('Erreur lors de la récupération de la catway par son identifiant');
  }
};


module.exports = { Catway, getAllCatways, getCatwayById };
