const { Catway, getAllCatways, getCatwayById } = require('../models/catwayModel');

exports.getCatwaysPage = async (req, res) => {
  try {
    const catways = await getAllCatways();
    res.render('catways', { catways });
  } catch (error) {
    console.error('Erreur lors de la récupération des catways:', error);
    res.status(500).send('Erreur lors de la récupération des catways');
  }
};

exports.getCatwayById = async (req, res) => {
  const catwayId = req.params.id;
  try {
    const catway = await getCatwayById(catwayId);
    res.render('catwayDetails', { catway });
  } catch (error) {
    console.error('Erreur lors de la récupération de la catway par son identifiant:', error);
    res.status(404).send('Catway non trouvé');
  }
};

exports.createCatway = async (req, res) => {
  try {
    const { catwayNumber, type, catwayState } = req.body;
    const newCatway = new Catway({ catwayNumber, type, catwayState });
    await newCatway.save();
    res.status(201).send('Catway créé avec succès');
  } catch (error) {
    console.error('Erreur serveur lors de la création du catway:', error);
    res.status(500).send('Erreur serveur lors de la création du catway');
  }
};
