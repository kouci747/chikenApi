const express = require("express");
const router = express.Router();
const chikenController = require("../controllers/chiken.controller");

//créer un poulet en BDD
router.post("/createchiken", chikenController.createChiken);

//Récupérer tous les poulets de la BDD
// router.get("/chiken", chikenController.getChiken);

// //Récupérer un poulet précis grace à son ID
// router.get("/:id", chikenController.getOneChiken);

// //Modifier un ou des champs d'un poulet particulier grace à son ID
// router.put("/:id", chikenController.updateChiken);

// //Supprimer un poulet grace à son ID
// router.delete("/:id", chikenController.deleteOneChiken);

// //Modifier un champs précis du document chiken
// router.patch("/Chiken/:id", chikenController.alterChiken);

module.exports = router;
