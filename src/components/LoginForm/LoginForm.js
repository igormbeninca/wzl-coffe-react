import React from "react";

import { connect } from "react-redux";

import {
  Actions as authActions,
  FETCHING_USER_FROM_TOKEN_SUCCESS
} from "../../redux/auth";

import { useNavigate } from "react-router-dom";

import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFieldPassword,
  EuiSpacer
} from "@elastic/eui";
import { Link } from "react-router-dom";
import validation from "../../utils/validation";
import styled from "styled-components";

const LoginFormWrapper = styled.div`
  padding: 2rem;
`;
const NeedAccountLink = styled.span`
  font-size: 0.8rem;
`;

const ForgotPasswordLink = styled.span`
  font-size: 0.8rem;
`;


function LoginForm({
  user,
  authError,
  isLoading,
  isAuthenticated,
  requestUserLogin
}) {
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({
    rfid: "",
  });
  const [errors, setErrors] = React.useState({});

  const validateInput = (label, value) => {
    // grab validation function and run it on input if it exists
    // if it doesn't exists, just assume the input is valid
    const isValid = validation?.[label] ? validation?.[label]?.(value) : true;
    // set an error if the validation function did NOT return true
    setErrors((errors) => ({ ...errors, [label]: !isValid }));
  };

  const handleInputChange = (label, value) => {
    validateInput(label, value);

    setForm((form) => ({ ...form, [label]: value }));
  };

  const navigate = useNavigate();
  // if the user is already authenticated, redirect them to the "/profile" page
  React.useEffect(() => {
    if (user?.email && isAuthenticated) {
      navigate("/newcoffe");
    }
  }, [user, navigate, isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate inputs before submitting
    Object.keys(form).forEach((label) => validateInput(label, form[label]));
    // if any input hasn't been entered in, return early
    if (!Object.values(form).every((value) => Boolean(value))) {
      setErrors((errors) => ({
        ...errors,
        form: `You must fill out all fields.`
      }));
      return;
    }

    //await requestUserLogin({ email: form.email, password: form.password });

    setHasSubmitted(true);
    const action = await requestUserLogin({
      rfid: form.rfid,
    });
    // reset the password form state if the login attempt is not successful
    if (action.type !== FETCHING_USER_FROM_TOKEN_SUCCESS)
      setForm((form) => ({ ...form, rfid: "" }));
  };
  const getFormErrors = () => {
    const formErrors = [];
    if (authError && hasSubmitted && !isLoading) {
      formErrors.push(`Invalid credentials. Please try again.`);
    }
    if (errors.form) {
      formErrors.push(errors.form);
    }
    return formErrors;
  };

  return (
    <LoginFormWrapper>
      <EuiForm
        component="form"
        onSubmit={handleSubmit}
        isInvalid={Boolean(getFormErrors().length)}
        error={getFormErrors()}
      >
        <EuiFormRow
          label="RFID"
          helpText="Scan the RFID associated with your account."
          isInvalid={Boolean(errors.rfid)}
          error={`Please enter a valid RFID.`}
        >
          <EuiFieldPassword
            //compressed={true}
            autoFocus
            ref={(input) => { this.nameInput = input; }} 
            placeholder="RFID"
            value={form.rfid}
            onChange={(e) => handleInputChange("rfid", e.target.value)}
            aria-label="Enter the rfid associated with your account."
            isInvalid={Boolean(errors.rfid)}
          />
        </EuiFormRow>

        {/* <EuiFormRow
          label="Password"
          helpText="Enter your password."
          isInvalid={Boolean(errors.password)}
          error={`Password must be at least 7 characters.`}
        >
          <EuiFieldPassword
            placeholder="••••••••••••"
            value={form.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            type="dual"
            aria-label="Enter your password."
            isInvalid={Boolean(errors.password)}
          />
        </EuiFormRow> */}
        <EuiSpacer />
        <EuiButton type="submit" fill isLoading={isLoading}>
          Submit
        </EuiButton>
      </EuiForm>

      <EuiSpacer size="xl" />

      <NeedAccountLink>
        Need an account? Sign up <Link to="/registration">here</Link>.
      </NeedAccountLink>
      {/* <EuiSpacer size="m" />
      <ForgotPasswordLink>
        Forgot your password? Recover it <Link to="/forgot">here</Link>.
      </ForgotPasswordLink> */}
    </LoginFormWrapper>
  );
}
const mapStateToProps = (state) => ({
  authError: state.auth.error,
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});
const mapDispatchToProps = (dispatch) => ({
  requestUserLogin: ({ rfid }) =>
    dispatch(authActions.requestUserLogin({ rfid }))
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);