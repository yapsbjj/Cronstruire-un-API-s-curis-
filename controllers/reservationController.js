const Reservation = require('../models/reservationModel');

// Afficher les réservations dans le dashboard
exports.showDashboard = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.render('dashboard', { reservations }); // Passer un seul objet de paramètres
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Afficher la liste des réservations
exports.listReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.render('reservations', { reservations }); // Passer un seul objet de paramètres
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Créer une nouvelle réservation
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

// Supprimer une réservation
exports.deleteReservation = async (req, res) => {
  const reservationId = req.params.id;
  try {
    await Reservation.findByIdAndDelete(reservationId);
    res.status(200).send('Réservation supprimée avec succès');
  } catch (error) {
    res.status(500).send('Erreur serveur lors de la suppression de la réservation');
  }
};
