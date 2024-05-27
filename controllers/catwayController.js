const catwayModel = require('../models/catwayModel');
const Catway = require('../models/catwayModel');
const reservationModel = require('../models/reservationModel');

exports.getCatwaysPage = async (req, res) => {
  const catways = await catwayModel.getAllCatways();
  res.render('catways', { catways });
};

exports.getAllCatways = async (req, res) => {
  
};

exports.getCatwayById = async (req, res) => {
  
};

exports.createCatway = async (req, res) => {
  try {
    const { name, location } = req.body;
    const newCatway = new Catway({ name, location });
    await newCatway.save();
    res.status(201).send('Catway créé avec succès');
  } catch (error) {
    res.status(500).send('Erreur serveur lors de la création du catway');
  }
};

exports.updateCatwayById = async (req, res) => {

};

exports.deleteCatwayById = async (req, res) => {

};

exports.getAllReservationsForCatway = async (req, res) => {

};

exports.getReservationByIdForCatway = async (req, res) => {

};

exports.createReservationForCatway = async (req, res) => {
  
};

exports.deleteReservationByIdForCatway = async (req, res) => {};



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

// Contrôleur pour obtenir la liste des catways
exports.getCatways = async (req, res) => {
  try {
    const catways = await Catway.find(); // Récupérer tous les catways depuis la base de données
    catways.forEach(catway => {
      console.log(catways); 
      console.log(`Catway Number: ${catway.catwayNumber}, Type: ${catway.type}, State: ${catway.catwayState}`);
    });
    res.send('Catways affichés dans le terminal'); // Envoyer une réponse pour indiquer que les catways ont été affichés dans le terminal
  } catch (error) {
    console.error('Erreur lors de la récupération des catways :', error);
    res.status(500).send('Erreur lors de la récupération des catways');
  }
};
