const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const apiRouter = require("./routes");
const cors = require("cors");
require("dotenv").config();
app.use(cors());

app.use(bodyParser.json());

mongoose.set("strictQuery", false);
//nom de la collection : chikenApi

/**
 * String de connexion
 */
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/chikenApi?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connecté à la base de données chikenApi");
  })
  .catch((err) => console.log(err));

//toutes les routes qui commencent pas /api/v1 seront cherchées dans apiRouter
app.use("/api/v1", apiRouter);

app.listen(process.env.PORT, function () {
  console.log("le server chikenAPI est lancé");
});
