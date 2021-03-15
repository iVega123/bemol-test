module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        Logradouro: String,
        Cep: Number,
        Bairro: String,
        Localidade: String,
        Uf: String,
        Numero: Number
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Endereco = mongoose.model("endereco", schema);
    return Endereco;
  };