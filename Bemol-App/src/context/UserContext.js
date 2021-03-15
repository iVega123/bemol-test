import axios from "axios";
const url = process.env.REACT_APP_BACKENDHOST;
export { createUser, getCep };
function createUser(Cep, Nome, Email, Cidade, Uf, Bairro, Endereco, Numero, SenhaValue, CpfValue, setIsLoading, setMessage, setShowSuccess, setShowError, setFadeError, setFadeSuccess) {
    setMessage(false);
    setIsLoading(true);
    let goodCep = Cep.replace("-", "");
    var targetUrl = url + "/api/endereco"
    axios
        .post(targetUrl, { Logradouro: Endereco, Cep: goodCep, Bairro: Bairro, Localidade: Cidade, Uf: Uf, Numero: Numero })
        .then(response => {
            targetUrl = url + "/api/users"
            axios
                .post(targetUrl, { Nome: Nome, Email: Email, Senha: SenhaValue, Cpf: CpfValue, Endereco: response.data.id })
                .then(response => {
                    if (response.data.erro) {
                        setShowError(true);
                        setFadeError(true);
                        setMessage(response.data.message);
                        setIsLoading(false);
                        return response;
                    } else {
                        setShowSuccess(true);
                        setFadeSuccess(true);
                        setMessage(response.data.message);
                        setIsLoading(false);
                        return response;
                    }
                })
        })
}
function getCep(Cep, setCidadeValue, setUfValue, setBairroValue, setEnderecoValue, setIsLoading, setMessage, setShowError, setFadeError) {
    setIsLoading(true);
    let goodCep = Cep.replace("-", "");
    var targetUrl = url + "/api/endereco/getCep"
    axios
        .post(targetUrl, { Cep: goodCep })
        .then(response => {
            if (response.data.erro) {
                setShowError(true);
                setFadeError(true);
                setMessage("Cep Inválido!");
                setIsLoading(false);
                return response;
            } else {
                setCidadeValue(response.data.localidade);
                setUfValue(response.data.uf);
                setBairroValue(response.data.bairro);
                setEnderecoValue(response.data.logradouro);
                setIsLoading(false);
            }
            return response;
        });
}