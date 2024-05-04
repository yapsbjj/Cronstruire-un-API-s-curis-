const catwayModel = require('../models/catwayModel');
const Catway = require('../models/catwayModel');

exports.getCatwaysPage = async (req, res) => {
  const catways = await catwayModel.getAllCatways();
  res.render('catways', { catways });
};

exports.getCatwayDetailsPage = async (req, res) => {
  const catwayId = req.params.id;
  const catway = await catwayModel.getCatwayById(catwayId);
  res.render('catwayDetails', { catway });
};

// Créer un nouveau catway
exports.createCatway = async (req, res) => {
  try {
    // Récupérer les données du corps de la requête
    const { catwayNumber, type, catwayState } = req.body;
    
    // Créer un nouvel objet Catway
    const newCatway = new Catway({
      catwayNumber,
      type,
      catwayState
    });

    // Enregistrer le nouvel objet Catway dans la base de données
    await newCatway.save();

    // Renvoyer une réponse de réussite
    res.status(201).send('Catway ajouté avec succès à la base de données');
  } catch (error) {
    // Gérer les erreurs
    console.error(error);
    res.status(500).send('Erreur serveur lors de la création du catway');
  }
};
