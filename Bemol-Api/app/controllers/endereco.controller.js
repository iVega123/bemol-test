const db = require("../models");
const Endereco = db.endereco;
var request = require('request');

exports.create = (req, res) => {
  if (!req.body.Cep) {
    res.status(200).send({ erro: true, message: "Cep não pode ser vazio!" });
    return;
  }
  if (!req.body.Numero) {
    res.status(200).send({ erro: true, message: "Numero não pode ser vazio!" });
    return;
  }

  const endereco = new Endereco({
    Logradouro: req.body.Logradouro,
    Cep: req.body.Cep,
    Bairro: req.body.Bairro,
    Localidade: req.body.Localidade,
    Uf: req.body.Uf,
    Numero: req.body.Numero
  });

  endereco
    .save(endereco)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu ao tentar criar o endereço!."
      });
    });
};

exports.findAll = (req, res) => {
  const Login = req.query.Login;
  var condition = Login ? { Login: { $regex: new RegExp(Login), $options: "i" } } : {};

  Endereco.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu ao tentar encontrar os endereços!."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Endereco.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Endereço não encontrado com a id= " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Não foi possivel encontrar o endereço com a id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Os dados para atualização não podem ser vazios!"
    });
  }

  const id = req.params.id;

  Endereco.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Não foi possivel atualizar o endereço com a id=${id}. Talvez o endereco não exista!`
        });
      } else res.send({ message: "Endereço atualizado com sucesso!" });
    })
    .catch(err => {
      res.status(500).send({
        message: "Houve algum erro para atualizar o endereço com a seguinte id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Endereco.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Não foi possivel deletar o endereço=${id}. Talvez o endereço não exista!`
        });
      } else {
        res.send({
          message: "Endereço deletado com sucesso!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possivel apagar o endereco com o seguinte id=" + id
      });
    });
};

exports.deleteAll = (res) => {
  Endereco.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Endereços foram deletados com sucesso!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro no delete dos endereços!"
      });
    });
};

exports.getCep = (req, res) => {
  let Cep = req.body.Cep;
  request({
    uri: 'https://viacep.com.br/ws/' + Cep + '/json/'
  }).pipe(res);
}