const chikenModel = require("../models/chiken.model.js");
const Chiken = require("../models/chiken.model.js");

exports.createChiken = (req, res) => {
  const newChiken = new Chiken({
    name: req.body.name,
    birthdate: req.body.birthdate,
    weight: req.body.weight,
  });
  newChiken.save();

  //infos renvoyées au front
  res.send({
    message: `le nouveau poulet ${req.body.name}a été créé avec succès`,
  });
};
