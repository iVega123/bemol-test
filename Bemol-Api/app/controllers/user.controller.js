const { mongoose } = require("../models");
const db = require("../models");
const Users = db.users;

// Cria e Salva o Objeto
exports.create = async (req, res) => {
  // Valida o Email
  if (!req.body.Nome) {
    res.status(200).send({ erro: true, message: "Email não pode ser vazio!" });
    return;
  }
  if (!req.body.Email) {
    res.status(200).send({ erro: true, message: "Email não pode ser vazio!" });
    return;
  }
  if (!req.body.Cpf) {
    res.status(200).send({ erro: true, message: "Cpf não pode ser vazia!" });
  }
  if (!req.body.Senha) {
    res.status(200).send({ erro: true, message: "Senha não pode ser vazia!" });
    return;
  }

  // Cria o Objeto
  const users = new Users({
    Nome: req.body.Nome,
    Email: req.body.Email,
    Senha: req.body.Senha,
    Cpf: req.body.Cpf,
    Endereco: mongoose.Types.ObjectId(req.body.Endereco)
  });
  let Exists = await Users.findOne({ Email: users.Email }).exec();
  if (Exists !== null) {
    res.status(200).send({
      message: "Usuário já existente!",
      erro: true
    })
  }
  // Salva o Objeto no banco
  users
    .save(users)
    .then((data) => {
      res.status(200).send({
        message: "Usuário foi cadastrado com sucesso!"
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro aconteceu na criação do Usuário!"
      });
    });
};

// Recupera todos os objetos salvos no banco.
exports.findAll = (req, res) => {
  const Login = req.query.Login;
  var condition = Login ? { Login: { $regex: new RegExp(Login), $options: "i" } } : {};

  Users.find(condition).populate('Endereco')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro aconteceu na listagem do Usuário provavelmente o banco de dados está inácessivel!"
      });
    });
};

// Acha um objeto pela sua ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Users.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Usuário não encontrado com o seguinte id=" + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Algum erro aconteceu na hora de encontrar o usuário com o seguinte id=" + id });
    });
};

// Atualiza o Objeto pelo ID
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Os dados para atualizar o usuário não pode estar vazio!"
    });
  }

  const id = req.params.id;

  Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Não foi possivel atualizar o usuário com o id=${id}. Talvez ele não exista!`
        });
      } else res.send({ message: "Usuário atualizado com sucesso!" });
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possivel atualizar o usuário com a seguinte id=" + id
      });
    });
};

// Apaga um objeto pela sua respectiva ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Users.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Não se pode deletar o usuário=${id}. talvez o usuário não exista!`
        });
      } else {
        res.send({
          message: "Usuário deletado com sucesso!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não se pode deletar o usuário=" + id
      });
    });
};

// Apaga todos os elementos do banco de dados.
exports.deleteAll = (res) => {
  Users.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Usuários deletados com sucesso!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro aconteceu no delete de todos os usuários!"
      });
    });
};