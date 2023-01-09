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

exports.getChiken = (req, res) => {
  Chiken.find()
    .then((chikens) => {
      res.send(chikens);
    })
    .catch((err) =>
      res.send(
        err + "les poulets ne sont pas là, quelle bande de poules mouillées.."
      )
    );
};

exports.getOneChiken = (req, res) => {
  Chiken.findById(req.params.id).then((chiken) => {
    if (!chiken) {
      return res.status(404).send({
        message:
          "Le poulet que vous cherchez a disparu ou n est pas encore sorti de son oeuf",
      });
    }
    res.status(200).send("poulet trouvé:" + chiken);
  });
};
