const Reservation = require('../models/reservationModel');

// Afficher les resa
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.render('reservations', { reservations });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};

// Afficher les détails d'une resa
exports.getReservationDetails = async (req, res) => {
  const reservationId = req.params.id;
  try {
    const reservation = await Reservation.findById(reservationId);
    res.render('reservationDetails', { reservation });
  } catch (error) {
    console.error(error);
    res.status(404).send('Réservation non trouvée');
  }
};

// Enregistrer une resa
exports.createReservation = async (req, res) => {
  const { catwayNumber, clientName, boatName, checkIn, checkOut } = req.body;
  try {
    const reservation = await Reservation.create({ catwayNumber, clientName, boatName, checkIn, checkOut });
    res.status(201).send('Réservation créée avec succès');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur lors de la création de la réservation');
  }
};

// Supprimer resa
exports.deleteReservation = async (req, res) => {
  const reservationId = req.params.id;
  try {
    await Reservation.findByIdAndDelete(reservationId);
    res.status(200).send('Réservation supprimée avec succès');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur lors de la suppression de la réservation');
  }
};
