//permet de vérifier l'existence en BDD d'un ObjectID
const { isValidObjectId } = require("mongoose");
const chikenModel = require("../models/chiken.model.js");
const Chiken = require("../models/chiken.model.js");
/**
 * Cette fonction permet de créer un objet Chiken. ses champs sont passés via req.body.<nomDuChamp>
 * @param {*} req :contient les champs de l'objet à créer.
 * @param {*} res : renvoie un message signifiant que l'bojet a été créé
 */
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
/**
 * Cette méthode renvoie tous les objects Chiken présents en BDD
 * @param {*} req : /
 * @param {*} res : renvoie tous les objects chikens
 */
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
/**
 * Cette méthode renvoie un objet précis grace à son ID passé en paramètre dans l'URL
 * @param {*} req : request qui contient l'ID de l'objet recerché en paramètre d'URL
 * @param {*} res : response qui renvoie l'objet recherché via son ID
 * @returns
 */
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
/**
 * modifier l'objet dont l'ID est passé en paramètre, {new : true} permet de retourner l'object mis à jour dans la réponse
 * @param {*} req: request qui contient l'ID de l'objet à modifier
 * @param {*} res : response qui retourne l'objet mis à jour
 */
exports.updateChiken = async (req, res) => {
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
/**
 *méthode qui supprime un document (Chiken) particulier grace à son ID
 * @param {*} req : request contenant l'ID du document à supprimer passé en paramètre d'URL
 * @param {*} res : response contenant un message indiquant que la suppression est un succès
 */
exports.deleteOneChiken = async (req, res) => {
  await Chiken.findByIdAndDelete(req.params.id)
    .then((chiken) =>
      res.send({
        message: `le poulet dont l'ID est ${chiken._id} a été passé à la rotisserie`,
      })
    )
    .catch((err) => res.status(400).send(err));
};
/**
 * méthode transitant par la méthode http PATCH permettant de modifier un champs précis du document plutot que tout le document
 * @param {*} req : request contenant les ID en entrée
 * @param {*} res : responose contenant l'objet retourné + un message
 * @returns
 */
exports.alterChiken = async (req, res) => {
  await Chiken.findByIdAndUpdate(
    req.params.id,
    { name: req.body.modifiedName },
    { new: true, upsert: true },
    console.log("nom du poulet modifié")
  );
  return res.status(200).send("nom du poulet modifié");
};

/**
 * //PATCH : modifier le tableau favoriteFood d'un poulet pour y ajouter une nouriture favorite
 * Ajoutée dans le but d'utiliser la méthode PATCH
 * La fonction asynchrone cherche un objet du modèle Chiken grace à la méthode findByIdAndUpdate
 * findByIdAndUpdate prend en paramètres:
 * 1. l'ID du document à modifier
 * 2. une méthode mongoose $addToSet qui permet de spécifier sur quel champs du document opérer un changement
 * 3. new : true qui permet de retourner l'objet mis à jour dans la res.
 * @param {*} req
 * @param {*} res
 */
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

/**
 *isRunning : variable initialement à false, deviendra true lorsque le nombre de steps sera incrementé
 * NOTE : puisque la fonction incrémente un compteur de pas (steps), initialement à 0, il est donc logique
 * de faire passer aussi le boolean isRunning (initialement à false) à true.
 * @param {*} req : permet de récupérer les para
 * @param {*} res : renvoie une réponse au client l'informant du succès de l'opération
 *
 * @param $inc : {steps :1} : incrémente la valeur du field steps de 1
 * @param $set: { isRunning: true } : fait passer la variable isRunning de son état par défaut (false) à true, et ce à cause du fait que la variable steps a été incrémentée
 * isRunning : variable initialement à false, deviendra true lorsque le nombre de steps sera incrementé
 * NOTE : puisque la fonction incrémente un compteur de pas (steps), initialement à 0, il est donc logique
 * de faire passer aussi le boolean isRunning (initialement à false) à true.
 * @returns
 */
exports.incrementSteps = async (req, res) => {
  await Chiken.findByIdAndUpdate(
    req.params.id,
    { $inc: { steps: 1 }, $set: { isRunning: true } },

    { new: true, upsert: true },
    console.log("nombre de steps incrémenté de 1")
  );

  return res
    .status(200)
    .send("nombre de pas incrementé, ce poulet commence à faire du chemin...");
};
