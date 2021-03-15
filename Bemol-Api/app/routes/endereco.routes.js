module.exports = app => {
    const endereco = require("../controllers/endereco.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", endereco.create);
  
    router.get("/", endereco.findAll);
  
    router.get("/:id", endereco.findOne);

    router.put("/:id", endereco.update);
  
    router.delete("/:id", endereco.delete);
  
    router.delete("/", endereco.deleteAll);

    router.post("/getCep", endereco.getCep);

    app.use('/api/endereco', router);
  };