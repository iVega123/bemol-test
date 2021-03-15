module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        Nome: String,
        Email: String,
        Senha: String,
        Cpf: String,
        Endereco: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'endereco'
        }],
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Usuario = mongoose.model("user", schema);
    return Usuario;
  };