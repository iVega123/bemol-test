module.exports = app => {
    const general = require("../controllers/general.controller.js");
  
    var router = require("express").Router();

    router.post("/Login", general.login);

    app.use('/api', router);
}