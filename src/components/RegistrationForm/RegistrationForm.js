import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Actions as registerActions,
  CREATE_USER_SUCCESS
} from "../../redux/register";
import {
  EuiButton,
  EuiCheckbox,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFieldPassword,
  EuiSpacer
} from "@elastic/eui";
import { Link } from "react-router-dom";
import validation from "../../utils/validation";
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import styled from "styled-components";

const RegistrationFormWrapper = styled.div`
  padding: 2rem;
`;
const NeedAccountLink = styled.span`
  font-size: 0.8rem;
`;

function RegistrationForm({
  regError,
  isLoading,
  createUser,
  user,
  isAuthenticated
}) {
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const [form, setForm] = React.useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    rfid:""
  });
  const [agreedToTerms, setAgreedToTerms] = React.useState(true);
  const [errors, setErrors] = React.useState({});

  const validateInput = (label, value) => {
    // grab validation function and run it on input if it exists
    // if it doesn't exists, just assume the input is valid
    const isValid = validation?.[label] ? validation?.[label]?.(value) : true;
    // set an error if the validation function did NOT return true
    setErrors((errors) => ({ ...errors, [label]: !isValid }));
  };

  const setAgreedToTermsCheckbox = (e) => {
    setAgreedToTerms(e.target.checked);
  };

  const handleInputChange = (label, value) => {
    validateInput(label, value);

    setForm((form) => ({ ...form, [label]: value }));
  };
  const navigate = useNavigate();
  // if the user is already authenticated, redirect them to the "/profile" page
  React.useEffect(() => {
    if (user?.email && isAuthenticated) {
      navigate("/");
    }
  }, [user, navigate, isAuthenticated]);
  const handlePasswordConfirmChange = (value) => {
    setErrors((errors) => ({
      ...errors,
      passwordConfirm:
        form.password !== value ? `Passwords do not match.` : null
    }));

    setForm((form) => ({ ...form, passwordConfirm: value }));
  };

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

    // some additional validation
    if (form.password !== form.passwordConfirm) {
      setErrors((errors) => ({ ...errors, form: `Passwords do not match.` }));
      return;
    }

    if (!agreedToTerms) {
      setErrors((errors) => ({
        ...errors,
        form: `You must agree to the terms and conditions.`
      }));
    }
    setHasSubmitted(true);
    const action = await createUser({
      email: form.email,
      password: form.password,
      full_name: form.username,
      rfid:form.rfid
    });
    if (action.type !== CREATE_USER_SUCCESS)
      setForm((form) => ({ ...form, password: "", passwordConfirm: "" }));
    else navigate("/login");
  };

  const getFormErrors = () => {
    const formErrors = [];
    if (regError && hasSubmitted) {
      formErrors.push(`Invalid credentials. Please try again.`);
    }
    if (errors.form) {
      formErrors.push(errors.form);
    }
    return formErrors;
  };

  return (
    <RegistrationFormWrapper>
      <EuiForm
        component="form"
        onSubmit={handleSubmit}
        isInvalid={Boolean(getFormErrors().length)}
        error={getFormErrors()}
      >
        <EuiFormRow
          label="Email"
          helpText="Enter the email associated with your account."
          isInvalid={Boolean(errors.email)}
          error={`Please enter a valid email.`}
        >
          <EuiFieldText
            autoFocus
            icon="email"
            placeholder="user@wzl.rwth-aachen.com"
            value={form.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            aria-label="Enter the email associated with your account."
            isInvalid={Boolean(errors.email)}
          />
        </EuiFormRow>

        <EuiFormRow
          label="Full Name"
          helpText="First Name, Last Name"
          //isInvalid={Boolean(errors.username)}
          //error={`Please enter a valid username.`}
        >
          <EuiFieldText
            icon="user"
            placeholder="Christian Brecher"
            value={form.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            aria-label="First Name, Last Name"
            //isInvalid={Boolean(errors.username)}
          />
        </EuiFormRow>

        <EuiFormRow
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
        </EuiFormRow>
        <EuiFormRow
          label="Confirm password"
          helpText="Confirm your password."
          isInvalid={Boolean(errors.passwordConfirm)}
          error={`Passwords must match.`}
        >
          <EuiFieldPassword
            placeholder="••••••••••••"
            value={form.passwordConfirm}
            onChange={(e) => handlePasswordConfirmChange(e.target.value)}
            type="dual"
            aria-label="Confirm your password."
            isInvalid={Boolean(errors.passwordConfirm)}
          />
        </EuiFormRow>

        <EuiFormRow
          label="RFID"
          helpText="Scan the RFID associated with your account."
          isInvalid={Boolean(errors.rfid)}
          error={`Please enter a valid RFID.`}
        >
          <EuiFieldPassword
            icon="email"
            placeholder="RFID"
            value={form.rfid}
            onChange={(e) => handleInputChange("rfid", e.target.value)}
            aria-label="Enter the rfid associated with your account."
            isInvalid={Boolean(errors.rfid)}
          />
        </EuiFormRow>

        <EuiSpacer />
        <EuiCheckbox
          id={htmlIdGenerator()()}
          label="I agree to the terms and conditions."
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTermsCheckbox(e)}
        />
        <EuiSpacer />
        <EuiButton type="submit" fill>
          Sign up
        </EuiButton>
      </EuiForm>

      <EuiSpacer size="xl" />

      <NeedAccountLink>
        Already have an account? Log in <Link to="/login">here</Link>.
      </NeedAccountLink>
    </RegistrationFormWrapper>
  );
}
// const mapStateToProps = (state) => ({
//   regError: state.register.error,
//   isLoading: state.register.isLoading,
//   user: state.register.user
// });
// const mapDispatchToProps = (dispatch) => ({
//   createUser: ({ email, password, full_name }) =>
//     dispatch(registerActions.createUser(email, password, full_name))
// });
// export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

export default connect(
  (state) => ({
    regError: state.register.error,
    isLoading: state.register.isLoading,
    user: state.register.user,
    isAuthenticated: state.auth.isAuthenticated
  }),
  {
    createUser: registerActions.createUser
  }
)(RegistrationForm);
