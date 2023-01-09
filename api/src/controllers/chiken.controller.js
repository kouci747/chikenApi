//permet de vérifier l'existence en BDD d'un ObjectID
const { isValidObjectId } = require("mongoose");
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
    message: `le nouveau poulet ${req.body.name} a été créé avec succès`,
  });
};

exports.getChiken = async (req, res) => {
  await Chiken.find()
    .then((chikens) => {
      res.send(chikens);
    })
    .catch((err) =>
      res.send(
        err + "les poulets ne sont pas là, quelle bande de poules mouillées.."
      )
    );
};

exports.getOneChiken = async (req, res) => {
  //on vérifie que l'ID du poulet passé en paramètre dans l'URL existe en BDD
  if (!isValidObjectId(req.params.id)) {
    return res
      .status(400)
      .send(
        "Le poulet que vous recherchez ne semble pas exister en BDD..peut-etre est-il toujours dans son oeuf ?! :" +
          req.params.id +
          console.log(` ${req.params.id}`)
      );
  }

  await Chiken.findById(req.params.id).then((chiken) => {
    if (!chiken) {
      return res.status(404).send({
        message:
          "Le poulet que vous cherchez a disparu ou n est pas encore sorti de son oeuf",
      });
    }
    res.status(200).send("poulet trouvé:" + chiken);
  });
};

exports.updateChiken = async (req, res) => {
  //modifier l'objet dont l'ID est passé en paramètre, {new : true} permet de retourner l'object mis à jour dans la réponse
  await Chiken.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((chiken) => {
      if (!chiken) {
        return res.status(404).send({
          message: "le poulet que vous voulez modifier n existe pas",
        });
      }
      res.send(chiken);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.deleteOneChiken = async (req, res) => {
  await Chiken.findByIdAndDelete(req.params.id)
    .then((chiken) =>
      res.send({
        message: `le poulet dont l'ID est ${chiken._id} a été passé à la rotisserie`,
      })
    )
    .catch((err) => res.status(400).send(err));
};

exports.alterChiken = async (req, res) => {
  await Chiken.findByIdAndUpdate(
    req.params.id,
    { name: req.body.modifiedName },
    { new: true, upsert: true },
    console.log("nom du poulet modifié")
  );
  return res.status(200).send("nom du poulet modifié");
};

//PATCH : modifier le tableau favoriteFood d'un poulet pour y ajouter une nouriture favorite
exports.alterAddFavoriteFood = async (req, res) => {
  await Chiken.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { favoriteFood: req.body.foodToAdd } }, //la méthode $addToSet permet d'ajouter quelque chose à l'array [favoriteFood] du Chiken Model
    { new: true, upsert: true },
    console.log("nourriture ajoutée"),
    res.status(201).send("vous avez ajouté un aliment aux favoris du poulet"),

    //callback
    (err, docs) => {
      if (err) return res.status(400).json(err);
    }
  );
};

exports.alterRemoveFavoriteFood = async (req, res) => {
  await Chiken.findByIdAndUpdate(
    req.params.id,
    { $pull: { favoriteFood: req.body.foodToRemove } }, //la méthode $pull permet de retirer quelque cjose à l'array  [favoriteFood] du Chiken Model
    { new: true, upsert: true },
    console.log("nourriture retirée")
  );
  return res
    .status(200)
    .send(
      "nourriture bien retirée, ce poulet fait la fine bouche (ou fin bec ?!)"
    );
};

exports.incrementSteps = async (req, res) => {
  await Chiken.findByIdAndUpdate(
    req.params.id,
    { $inc: { steps: 1 }, $set: { isRunning: true } }, //puisque le poulet avance pas à pas, alors isRunning doit passer de false à true

    { new: true, upsert: true },
    console.log("nombre de steps incrémenté de 1")
  );

  return res
    .status(200)
    .send("nombre de pas incrementé, ce poulet commence à faire du chemin...");
};
