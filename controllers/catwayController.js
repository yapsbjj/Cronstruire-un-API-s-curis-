const Catway = require('../models/catwayModel');

exports.getCatwaysPage = async (req, res) => {
  const catways = await Catway.find();
  res.render('catways', { catways });
};

exports.getCatwayById = async (req, res) => {
  const catwayId = req.params.id;
  try {
    const catway = await Catway.findById(catwayId);
    res.render('catwayDetails', { catway });
  } catch (error) {
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
    res.status(500).send('Erreur serveur lors de la création du catway');
  }
};

exports.getCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.render('catways', { catways });
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération des catways');
  }
};
