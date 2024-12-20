/**
 * @file reservationController.js
 * @description Contrôleur pour la gestion des réservations.
 */

const Reservation = require('../models/reservationModel');

/**
 * Affiche les réservations dans le tableau de bord.
 * @async
 * @function showDashboard
 * @param {Object} req - Objet de requête Express.
 * @param {Object} res - Objet de réponse Express.
 * @returns {void}
 */
exports.showDashboard = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.render('dashboard', { reservations });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * Affiche la liste complète des réservations.
 * @async
 * @function listReservations
 * @param {Object} req - Objet de requête Express.
 * @param {Object} res - Objet de réponse Express.
 * @returns {void}
 */
exports.listReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.render('reservations', { reservations });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * Crée une nouvelle réservation.
 * @async
 * @function createReservation
 * @param {Object} req - Objet de requête Express.
 * @param {Object} req.body - Corps de la requête.
 * @param {number} req.body.catwayNumber - Numéro du Catway.
 * @param {string} req.body.clientName - Nom du client.
 * @param {string} req.body.boatName - Nom du bateau.
 * @param {Date} req.body.checkIn - Date d'arrivée.
 * @param {Date} req.body.checkOut - Date de départ.
 * @param {Object} res - Objet de réponse Express.
 * @returns {void}
 */
exports.createReservation = async (req, res) => {
  const { catwayNumber, clientName, boatName, checkIn, checkOut } = req.body;
  try {
    const reservation = new Reservation({ catwayNumber, clientName, boatName, checkIn, checkOut });
    await reservation.save();
    res.status(201).send('Réservation créée avec succès');
  } catch (error) {
    res.status(500).send('Erreur serveur lors de la création de la réservation');
  }
};

/**
 * Supprime une réservation par son identifiant.
 * @async
 * @function deleteReservation
 * @param {Object} req - Objet de requête Express.
 * @param {string} req.params.id - Identifiant de la réservation.
 * @param {Object} res - Objet de réponse Express.
 * @returns {void}
 */
exports.deleteReservation = async (req, res) => {
  const reservationId = req.params.id;
  try {
    await Reservation.findByIdAndDelete(reservationId);
    res.status(200).send('Réservation supprimée avec succès');
  } catch (error) {
    res.status(500).send('Erreur serveur lors de la suppression de la réservation');
  }
};
