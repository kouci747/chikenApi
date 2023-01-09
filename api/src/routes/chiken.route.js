const express = require("express");
const router = express.Router();
const chikenController = require("../controllers/chiken.controller");

//créer un poulet en BDD : POST http://localhost:5000/api/v1/chiken/createChiken
router.post("/createChiken", chikenController.createChiken);

//Récupérer tous les poulets de la BDD : GET http://localhost:5000/api/v1/chiken/getChikens
router.get("/getChikens", chikenController.getChiken);

// //Récupérer un poulet précis grace à son ID  : GET http://localhost:5000/api/v1/chiken/63bc13508fb6df96a3b552e2
router.get("/:id", chikenController.getOneChiken);

// //Modifier un poulet particulier grace à son ID PUT http://localhost:5000/api/v1/chiken/63bc13508fb6df96a3b552e2
router.put("/:id", chikenController.updateChiken);

// //Supprimer un poulet grace à son ID DELETE : http://localhost:5000/api/v1/chiken/63bc23b8c65aab84d0368d2a
router.delete("/:id", chikenController.deleteOneChiken);

// //Modifier un champs précis du document chiken : PATCH : http://localhost:5000/api/v1/chiken/alterChiken/63bc13508fb6df96a3b552e2
router.patch("/alterChiken/:id", chikenController.alterChiken);

//modifier le tableau contenant la nouriture favorite d'un poulet (PATCH) http://localhost:5000/api/v1/chiken/alterAddFavoriteFood/63bc13508fb6df96a3b552e2
router.patch(
  "/alterAddFavoriteFood/:id",
  chikenController.alterAddFavoriteFood
);

//modifier le tableau [favoriteFood] : retirer la nourriture favorite d'un poulet : PATCH http://localhost:5000/api/v1/chiken/alterRemoveFavoriteFood/63bc13508fb6df96a3b552e2
router.patch(
  "/alterRemoveFavoriteFood/:id",
  chikenController.alterRemoveFavoriteFood
);
// incrémenter le nombre de steps d'un poulet spécifique
router.patch("/run/:id", chikenController.incrementSteps);

module.exports = router;
