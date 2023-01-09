const express = require("express");
const router = express.Router();
const chikenController = require("../controllers/chiken.controller");

//créer un poulet en BDD : POST http://localhost:5000/api/v1/chiken/createChiken
router.post("/createChiken", chikenController.createChiken);

//Récupérer tous les poulets de la BDD : GET http://localhost:5000/api/v1/chiken/getChikens
router.get("/getChikens", chikenController.getChiken);

// //Récupérer un poulet précis grace à son ID
router.get("/:id", chikenController.getOneChiken);

// //Modifier un ou des champs d'un poulet particulier grace à son ID
// router.put("/:id", chikenController.updateChiken);

// //Supprimer un poulet grace à son ID
// router.delete("/:id", chikenController.deleteOneChiken);

// //Modifier un champs précis du document chiken
// router.patch("/Chiken/:id", chikenController.alterChiken);

module.exports = router;
