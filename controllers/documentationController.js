// Docu de l'API
exports.getApiDocumentation = (req, res) => {
    const apiDocumentation = `
      Documentation de l'API :
      GET /catways - Afficher la liste des catways
      GET /catways/:id - Afficher les détails d'un catway
      POST /catways - Créer un nouveau catway
      PUT /catways/:id - Mettre à jour un catway existant
      DELETE /catways/:id - Supprimer un catway
  
      GET /reservations - Afficher la liste des réservations
      GET /reservations/:id - Afficher les détails d'une réservation
      POST /reservations - Créer une nouvelle réservation
      DELETE /reservations/:id - Supprimer une réservation
  
      GET /documentation - Afficher la documentation de l'API
    `;
    res.send(apiDocumentation);
  };
  