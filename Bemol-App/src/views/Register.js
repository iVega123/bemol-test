import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import { CircularProgress } from "@material-ui/core";
// @material-ui/icons components
import Home from "@material-ui/icons/Home";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import School from "@material-ui/icons/School";
import FormGroup from "@material-ui/core/FormGroup";
import { createUser, getCep } from "../context/UserContext";
import InputMask from "react-input-mask";
import ThumbUp from "@material-ui/icons/ThumbUp";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import Fade from "@material-ui/core/Fade";
import hexToRgb from "assets/theme/hex-to-rgb.js";
import ErrorIcon from '@material-ui/icons/Error';
// core components
import componentStyles from "assets/theme/views/register.js";

const useStyles = makeStyles(componentStyles);

function Register(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [fadeSuccess, setFadeSuccess] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const successSnackbarRootClasses = { root: classes.successSnackbar }
  const [fadeError, setFadeError] = useState(true);
  const [showError, setShowError] = useState(false);
  const errorSnackbarRootClasses = { root: classes.errorSnackbar };
  var [NomeValue, setnomeValue] = useState("");
  var [EmailValue, setemailValue] = useState("");
  var [CpfValue, setCpfValue] = useState("");
  var [NumeroValue, setnumeroValue] = useState("");
  var [CepValue, setcepValue] = useState("");
  var [isLoading, setIsLoading] = useState(false);
  var [message, setMessage] = useState("");
  var [CidadeValue, setCidadeValue] = useState("");
  var [UfValue, setUfValue] = useState("");
  var [BairroValue, setBairroValue] = useState("");
  var [EnderecoValue, setEnderecoValue] = useState("");
  var [SenhaValue, setSenhaValue] = useState("");
  const temNumero = SenhaValue => {
    return new RegExp(/[0-9]/).test(SenhaValue);
  }
  const letrasMaioreseMenores = SenhaValue => {
    return new RegExp(/[a-z]/).test(SenhaValue) &&
      new RegExp(/[A-Z]/).test(SenhaValue);
  }
  const temCaractereEspecial = SenhaValue => {
    return new RegExp(/[!#@$%^&*)(+=._-]/).test(SenhaValue);
  }
  function forcadaSenha(SenhaValue) {
    let forca = 0;
    if (SenhaValue.length > 5)
      forca++;
    if (SenhaValue.length > 7)
      forca++;
    if (temNumero(SenhaValue))
      forca++;
    if (temCaractereEspecial(SenhaValue))
      forca++;
    if (letrasMaioreseMenores(SenhaValue))
      forca++;
    return forca;
  }
  function indicadorSenha(forca) {
    if (forca < 2)
      return 'red';
    if (forca < 3)
      return 'yellow';
    if (forca < 4)
      return 'orange';
    if (forca < 5)
      return 'lightgreen';
    if (forca < 6)
      return 'green';
  }
  function indicadorForca(forca) {
    if (forca < 2)
      return 'Muito Fraca';
    if (forca < 3)
      return 'Fraca';
    if (forca < 4)
      return 'Ok';
    if (forca < 5)
      return 'Forte';
    if (forca < 6)
      return 'Muito Forte';
  }
  let forcaSenha = forcadaSenha(SenhaValue);
  let indicadordaSenha = indicadorSenha(forcaSenha);
  let indicadorforca = indicadorForca(forcaSenha);
  return (
    <>
      <Grid item xs={12} lg={6} md={8}>
        <Card classes={{ root: classes.cardRoot }}>
          <CardContent classes={{ root: classes.cardContent }}>
            <Box
              color={theme.palette.gray[600]}
              textAlign="center"
              marginBottom="1.5rem"
              marginTop=".5rem"
              fontSize="1rem"
            >
              <Box fontSize="80%" fontWeight="400" component="small">
                Registre-se!
              </Box>
            </Box>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1.5rem!important"
            >
              <FilledInput
                autoComplete="off"
                type="text"
                placeholder="Nome"
                value={NomeValue}
                onChange={e => setnomeValue(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <School />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1.5rem!important"
            >
              <FilledInput
                autoComplete="off"
                type="email"
                placeholder="Email"
                value={EmailValue}
                onChange={e => setemailValue(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1.5rem!important"
            >
              <InputMask
                mask="999.999.999-99"
                value={CpfValue}
                disabled={false}
                onChange={e => setCpfValue(e.target.value)}
              >{() => <FilledInput
                autoComplete="off"
                placeholder="Cpf"
                type="text"
                value={CpfValue}
                startAdornment={
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                }
              />
                }
              </InputMask>
            </FormControl>
            <div className={classes.plLg4}>
              <Grid container>
                <Grid item xs={12} lg={9}>
                  <FormGroup>
                    <FormControl
                      variant="filled"
                      component={Box}
                      width="100%"
                      paddingLeft="0.75rem"
                      paddingRight="0.75rem"
                      marginBottom="1rem!important"
                    >
                      <InputMask
                        mask="99999-999"
                        value={CepValue}
                        disabled={false}
                        onChange={e => setcepValue(e.target.value)}
                      >
                        {() => <FilledInput
                          type="text"
                          placeholder="Cep"
                          value={CepValue}
                          startAdornment={
                            <InputAdornment position="start">
                              <Home />
                            </InputAdornment>
                          }
                          autoComplete="off"
                          type="text"
                        />}
                      </InputMask>
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={3}>
                  <Box textAlign="center">
                    {isLoading ? (
                      <CircularProgress size={26} className={classes.loginLoader} />
                    ) : (
                      < Button
                        color="primary"
                        variant="contained"
                        disabled={CepValue.length !== 9}
                        onClick={() =>
                          getCep(
                            CepValue,
                            setCidadeValue,
                            setUfValue,
                            setBairroValue,
                            setEnderecoValue,
                            setIsLoading,
                            setMessage,
                            setShowError,
                            setFadeError
                          )
                        }>
                        Verificar!
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} lg={4}>
                  <FormGroup>
                    <FormControl
                      variant="filled"
                      component={Box}
                      width="100%"
                      marginBottom="1rem!important"
                    >
                      <Box
                        paddingLeft="0.75rem"
                        paddingRight="0.75rem"
                        value={CidadeValue}
                        onChange={e => setCidadeValue(e.target.value)}
                        component={FilledInput}
                        autoComplete="off"
                        disabled={true}
                        type="text"
                        placeholder="Cidade"
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={3}>
                  <FormGroup>
                    <FormControl
                      variant="filled"
                      component={Box}
                      width="100%"
                      marginBottom="1rem!important"
                    >
                      <Box
                        paddingLeft="0.75rem"
                        paddingRight="0.75rem"
                        value={UfValue}
                        onChange={e => setUfValue(e.target.value)}
                        component={FilledInput}
                        autoComplete="off"
                        disabled={true}
                        type="text"
                        placeholder="Uf"
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={5}>
                  <FormGroup>
                    <FormControl
                      variant="filled"
                      component={Box}
                      width="100%"
                      marginBottom="1rem!important"
                    >
                      <Box
                        paddingLeft="0.75rem"
                        paddingRight="0.75rem"
                        value={BairroValue}
                        onChange={e => setBairroValue(e.target.value)}
                        component={FilledInput}
                        disabled={true}
                        autoComplete="off"
                        type="text"
                        placeholder="Bairro"
                      />
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>
            </div>
            <Grid container>
              <Grid item xs={12} lg={9}>
                <FormControl
                  variant="filled"
                  component={Box}
                  width="100%"
                  marginBottom="1.5rem!important"
                >
                  <FilledInput
                    autoComplete="off"
                    type="text"
                    placeholder="Endereço"
                    disabled={true}
                    value={EnderecoValue}
                    onChange={e => setEnderecoValue(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <Home />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={3}>
                <FormControl
                  variant="filled"
                  component={Box}
                  width="100%"
                  marginBottom="1.5rem!important"
                >
                  <InputMask
                    mask="9999"
                    value={NumeroValue}
                    disabled={false}
                    onChange={e => setnumeroValue(e.target.value)}
                    maskChar=" "
                  >{() =>
                    <FilledInput
                      required={true}
                      value={NumeroValue}
                      autoComplete="off"
                      placeholder="Numero"
                    />
                    }
                  </InputMask>
                </FormControl>
              </Grid>
            </Grid>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1.5rem!important"
            >
              <FilledInput
                autoComplete="off"
                type="password"
                placeholder="Senha"
                value={SenhaValue}
                onChange={e => setSenhaValue(e.target.value)}
                startAdornment={
                  <InputAdornment position="start"

                  >
                    <Lock />
                  </InputAdornment>
                }
              />
            </FormControl>
            {SenhaValue !== "" ? (
              <Box
                fontStyle="italic"
                fontSize="1rem"
                color={theme.palette.gray[600]}
                marginBottom=".5rem"
              >
                <Box component="small" fontSize="80%">
                  Força da Senha: {" "}
                  <Box
                    component="span"
                    fontWeight="700"
                    color={indicadordaSenha}
                  >
                    {indicadorforca}
                  </Box>
                </Box>
              </Box>
            ) : null
            }
            <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
              <Button
                color="primary"
                variant="contained"
                disabled={CepValue.length === 8}
                onClick={() => createUser(
                  CepValue,
                  NomeValue,
                  EmailValue,
                  CidadeValue,
                  UfValue,
                  BairroValue,
                  EnderecoValue,
                  NumeroValue,
                  SenhaValue,
                  CpfValue,
                  setIsLoading,
                  setMessage,
                  setShowSuccess,
                  setShowError,
                  setFadeError,
                  setFadeSuccess
                )}
              >
                Criar Conta!
              </Button>
            </Box>
          </CardContent>
        </Card>
        {showSuccess && (
          <Fade in={fadeSuccess} onExited={() => setShowSuccess(false)}>
            <SnackbarContent
              elevation={0}
              classes={successSnackbarRootClasses}
              action={
                <Box
                  component={IconButton}
                  padding="0!important"
                  onClick={() => setFadeSuccess(false)}
                >
                  <Box
                    component="span"
                    color={"rgba(" + hexToRgb(theme.palette.white.main) + ",.6)"}
                  >
                    ×
                </Box>
                </Box>
              }
              message={
                <>
                  <Box
                    fontSize="1.25rem"
                    display="flex"
                    marginRight="1.25rem"
                    alignItems="center"
                  >
                    <Box
                      component={ThumbUp}
                      width="1.25rem!important"
                      height="1.25rem!important"
                    />
                  </Box>
                  <strong style={{ marginRight: "5px" }}>Ok! </strong> Usuário Criado com Sucesso!
                </>
              }
            />
          </Fade>
        )}
        {showError && (
          <Fade in={fadeError} onExited={() => setShowError(false)}>
            <SnackbarContent
              elevation={0}
              classes={errorSnackbarRootClasses}
              action={
                <Box
                  component={IconButton}
                  padding="0!important"
                  onClick={() => setFadeError(false)}
                >
                  <Box
                    component="span"
                    color={"rgba(" + hexToRgb(theme.palette.white.main) + ",.6)"}
                  >
                    ×
                </Box>
                </Box>
              }
              message={
                <>
                  <Box
                    fontSize="1.25rem"
                    display="flex"
                    marginRight="1.25rem"
                    alignItems="center"
                  >
                    <Box
                      component={ErrorIcon}
                      width="1.25rem!important"
                      height="1.25rem!important"
                    />
                  </Box>
                  <strong style={{ marginRight: "5px" }}>Error!</strong> {message}
                </>
              }
            />
          </Fade>
        )}
      </Grid>
    </>
  );
}

export default Register;
