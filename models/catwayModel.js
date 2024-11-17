const mongoose = require('mongoose');

// schema pour Catway
const catwaySchema = new mongoose.Schema({
  catwayNumber: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  catwayState: {
    type: String,
    required: true
  }
});

// Créer le modèle Catway
const Catway = mongoose.model('Catway', catwaySchema);

// Fonction pour obtenir tous les catways
async function getAllCatways() {
  try {
    const catways = await Catway.find();
    return catways;
  } catch (error) {
    console.error('Erreur lors de la récupération des catways:', error);
    throw error;
  }
}

// Fonction pour obtenir un catway par son identifiant
async function getCatwayById(catwayId) {
  try {
    // Vérifier si l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(catwayId)) {
      throw new Error('Identifiant non valide');
    }

    // Chercher le catway dans la base de données par son ID
    const catway = await Catway.findById(catwayId);
    if (!catway) {
      throw new Error('Catway non trouvé');
    }

    return catway;
  } catch (error) {
    console.error('Erreur lors de la récupération de la catway par son identifiant:', error.message);
    throw error;
  }
}


module.exports = {
  Catway,
  getAllCatways,
  getCatwayById
};
