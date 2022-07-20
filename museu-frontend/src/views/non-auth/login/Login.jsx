import { useState, useEffect, useContext } from "react";
import { useTheme } from "styled-components";
import {
  AppLogo,
  AuthContainer,
  AuthLeftContainer,
  AuthLeftContainerHeader,
  LoginOrRegisterMessage,
  StyledLink,
  AuthLeftContainerHeaderSubtitle,
  IconContainer,
  LoginContainerDividerText,
  AuthLeftContainerContent,
  FormContainer,
  LoginOptionsContainer,
  RememberMeContainer,
  LoginOptionsText,
  GithubOauthLink,
  ErrorMessage,
} from "./styles";

import logo from "../../../assets/images/logos/bv-logo.svg";

import { FRONT_BASEURL } from "../../../services/useAxios";
import AuthContext from "../../../contexts/auth";
import { BsWindows } from "react-icons/bs";
import Button from "./../../../components/button/Button";
import Checkbox from "../../../components/checkbox/Checkbox";
import Input from "./../../../components/input/Input";
import { Topbar } from "./../../../components/topbar/Topbar";
import IconButton from "@mui/material/IconButton";

import { paths } from "../../../services/utils/paths";

export const MicrosoftIcon = () => (
  <IconContainer>
    <BsWindows size={24} />
  </IconContainer>
);

export default function Login() {
  const context = useContext(AuthContext);
  const theme = useTheme();
  const { state, dispatch } = context;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [disabledForm, setDisabledForm] = useState(false);
  const [loading, setLoading] = useState(false);

  if (state.isLoggedIn) {
    window.location.replace(`${FRONT_BASEURL}/dashboard`);
  }

  function checkButtonDisabled() {
    const value = !email || !password;
    return value;
  }

  function handleOnChangeForm(e) {
    const { value, name } = e.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  }

  function handleOnChangeRememberMe(e) {
    let isChecked = e.target.checked;
    setRememberMe(isChecked);
  }

  function resetFormOnError(errors) {
    if (errors.email || errors.register[0] === "False") {
      errors.email
        ? setErrors({ email: errors.email[0] })
        : setErrors({ email: errors.detail[0] });
    }

    if (errors.register && errors.register[0] === "True") {
      setErrors({ password: errors.detail[0] });
    }

    !(errors.register || errors.email) &&
      setErrors({ email: errors, password: errors });

    localStorage.clear();
    setLoading(false);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
      rememberMe: rememberMe,
    };

    const response = await context.Login(user);

    setTimeout(() => {
      if (response.status === 200) {
        const user = response.data["user"];
        delete response.data["user"];

        dispatch({
          type: "LOGIN",
          payload: {
            user: user,
            isLoggedIn: true,
            tokens: response.data,
          },
        });
      } else {
        resetFormOnError(response.data);
      }

      setDisabledForm(false);
    }, 2000);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  function handleOnSubmit(e) {
    setLoading(true);

    setDisabledForm(true);
    onSubmit(e);
  }

  function handleOnClickLogo() {
    window.location.replace("/");
  }

  return (
    <AuthContainer>
      <Topbar
        nonAuth
        topbarButtonText="Cadastrar-se"
        toPath={paths.signup}
        IconElement={
          <IconButton
            color="inherit"
            aria-label="app-logo"
            onClick={handleOnClickLogo}
            edge="start"
            disableRipple
          >
            <AppLogo src={logo} alt="logo" />
          </IconButton>
        }
      />
      <AuthLeftContainer>
        <AuthLeftContainerHeader>
          <LoginOrRegisterMessage>
            Entre na sua conta ou
            <StyledLink inline to={paths.signup}>
              {" "}
              cadastre-se
            </StyledLink>
          </LoginOrRegisterMessage>
          <AuthLeftContainerHeaderSubtitle>
            Acesse sua conta para fazer deploy, teste ou monitoramento de
            modelos
          </AuthLeftContainerHeaderSubtitle>
        </AuthLeftContainerHeader>

        <AuthLeftContainerContent>
          <GithubOauthLink
            // href={`https://github.com/login/oauth/authorize?scope=user,repo&client_id=${client_id}&redirect_uri=${redirect_uri}`}
            onClick={() => {
              // setLoading(true);
            }}
            rel="noreferrer"
          >
            <Button
              Icon={MicrosoftIcon}
              iconSize={24}
              iconColor="white"
              border
              color={theme.colors.black}
              bgColor={theme.colors.white}
              borderColor={theme.colors.disabledButton}
            >
              Continuar com Microsoft
            </Button>
          </GithubOauthLink>
          <LoginContainerDividerText>- OU -</LoginContainerDividerText>

          <FormContainer onSubmit={handleOnSubmit}>
            <Input
              placeholder="Digite seu email"
              autoFocus
              type="email"
              name="email"
              label="Email"
              value={email}
              required
              marginTop={10}
              borderColor={theme.colors.disabledButton}
              disabled={disabledForm}
              onChange={(e) => handleOnChangeForm(e)}
            />
            <ErrorMessage>{errors.email}</ErrorMessage>

            <Input
              placeholder="Digite sua senha"
              type="password"
              name="password"
              label="Senha"
              value={password}
              required
              marginTop={10}
              lblTop={10}
              borderColor={theme.colors.disabledButton}
              disabled={disabledForm}
              onChange={(e) => handleOnChangeForm(e)}
            />
            <ErrorMessage>{errors.password}</ErrorMessage>
            <LoginOptionsContainer>
              <RememberMeContainer>
                <Checkbox
                  checked={rememberMe}
                  bgColor={theme.colors.primary}
                  onChange={(e) => handleOnChangeRememberMe(e)}
                />

                <LoginOptionsText marginLeft={12} marginTop={2}>
                  Lembrar de mim
                </LoginOptionsText>
              </RememberMeContainer>
              <StyledLink to={paths.resetPassword}>
                <LoginOptionsText color={theme.colors.primary}>
                  Esqueceu a senha?
                </LoginOptionsText>
              </StyledLink>
            </LoginOptionsContainer>

            <Button
              btnType="loading"
              type="submit"
              value="Entrar"
              marginTop={4}
              bgColor={theme.colors.primary}
              disabled={checkButtonDisabled() || loading}
              loading={loading}
            >
              Entrar
            </Button>
          </FormContainer>
        </AuthLeftContainerContent>
      </AuthLeftContainer>
    </AuthContainer>
  );
}
