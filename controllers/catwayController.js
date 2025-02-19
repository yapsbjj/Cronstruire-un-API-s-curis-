/**
 * @file catwayController.js
 * @description Contrôleur pour la gestion des Catways (ajout, modification, suppression, récupération).
 */

const { Catway, getAllCatways, getCatwayById } = require('../models/catwayModel');

/**
 * Récupère tous les Catways.
 * @async
 * @function getCatwaysPage
 * @param {Object} req - Objet de requête Express.
 * @param {Object} res - Objet de réponse Express.
 * @returns {void}
 */

exports.getCatwaysPage = async (req, res) => {
  try {
    const catways = await getAllCatways();
    res.render('catways', { catways });
  } catch (error) {
    console.error('Erreur lors de la récupération des catways:', error);
    res.status(500).send('Erreur lors de la récupération des catways');
  }
};

/**
 * Récupère un Catway par son identifiant.
 * @async
 * @function getCatwayById
 * @param {Object} req - Objet de requête Express.
 * @param {string} req.params.id - Identifiant du Catway.
 * @param {Object} res - Objet de réponse Express.
 * @returns {void}
 */

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

/**
 * Crée un nouveau Catway.
 * @async
 * @function createCatway
 * @param {Object} req - Objet de requête Express.
 * @param {Object} req.body - Corps de la requête.
 * @param {number} req.body.catwayNumber - Numéro du Catway.
 * @param {string} req.body.type - Type du Catway ("long" ou "short").
 * @param {string} req.body.catwayState - État du Catway ("Disponible", "Occupé", etc.).
 * @param {Object} res - Objet de réponse Express.
 * @returns {void}
 */

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

/**
 * Modifie un Catway existant.
 * @async
 * @function updateCatway
 * @param {Object} req - Objet de requête Express.
 * @param {string} req.params.id - Identifiant du Catway à modifier.
 * @param {Object} req.body - Corps de la requête avec les données à mettre à jour.
 * @param {number} req.body.catwayNumber - Nouveau numéro du Catway.
 * @param {string} req.body.type - Nouveau type du Catway.
 * @param {string} req.body.catwayState - Nouvel état du Catway.
 * @param {Object} res - Objet de réponse Express.
 * @returns {void}
 */

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

/**
 * Supprime un Catway par son identifiant.
 * @async
 * @function deleteCatway
 * @param {Object} req - Objet de requête Express.
 * @param {string} req.params.id - Identifiant du Catway à supprimer.
 * @param {Object} res - Objet de réponse Express.
 * @returns {void}
 */

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