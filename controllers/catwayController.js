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

// créer un catway
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

// modifier un catway
exports.updateCatway = async (req, res) => {
  const catwayId = req.params.id;
  const { catwayNumber, type, catwayState } = req.body;
  try {
    const updatedCatway = await Catway.findByIdAndUpdate(
      catwayId,
      { catwayNumber, type, catwayState },
      { new: true, runValidators: true }
    );
    if (!updatedCatway) {
      return res.status(404).send('Catway non trouvé');
    }
    res.status(200).send('Catway modifié avec succès');
  } catch (error) {
    console.error('Erreur lors de la modification du catway:', error);
    res.status(500).send('Erreur lors de la modification du catway');
  }
};

// supprimer un catway
exports.deleteCatway = async (req, res) => {
  const catwayId = req.params.id;
  try {
    const deletedCatway = await Catway.findByIdAndDelete(catwayId);
    if (!deletedCatway) {
      return res.status(404).send('Catway non trouvé');
    }
    res.status(200).send('Catway supprimé avec succès');
  } catch (error) {
    console.error('Erreur lors de la suppression du catway:', error);
    res.status(500).send('Erreur lors de la suppression du catway');
  }
};
