const express = require("express");
const router = express.Router();
const chikenRouter = require("./chiken.route");

router.use("/chiken", chikenRouter);

module.exports = router;
