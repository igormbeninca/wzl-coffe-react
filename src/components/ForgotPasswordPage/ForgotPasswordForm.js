import React from "react";

import { connect } from "react-redux";

import {
  Actions as passwordActions
} from "../../redux/password";

import { useNavigate } from "react-router-dom";

import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiGlobalToastList
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

let addToastHandler;
let toastId = 0;

export function addToast() {
  addToastHandler();
}


function ForgotPasswordForm({
  error,
  isLoading,
  data,
  postRecover
}) {
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({
    email: ""
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

//   const navigate = useNavigate();
//   // if the user is already passwordenticated, redirect them to the "/profile" page
//   React.useEffect(() => {
//     if (user?.email && isAuthenticated) {
//       navigate("/");
//     }
//   }, [user, navigate, isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate inputs before submitting
    Object.keys(form).forEach((label) => validateInput(label, form[label]));
    // if any input hasn't been entered in, return early
    if (!Object.values(form).every((value) => Boolean(value))) {
      setErrors((errors) => ({
        ...errors,
        form: `Please enter an e-mail.`
      }));
      return;
    }

    //await requestUserLogin({ email: form.email, password: form.password });

    setHasSubmitted(true);
    const action = await postRecover({
      email: form.email
    });
    // reset the password form state if the login attempt is not successful
    if (action?.success && !isLoading){
      addToast();
      setForm((form) => ({ ...form, email: "" }));
    }
  };
  const getFormErrors = () => {
    const formErrors = [];
    if (error && hasSubmitted && !isLoading) {
      formErrors.push(`E-mail not found.`);
      //formErrors.push(error)
    }
    if (errors.form) {
      formErrors.push(errors.form);
    }
    return formErrors;
  };
    // Toast
    const [toasts, setToasts] = React.useState([]);

    addToastHandler = () => {
        const toast = getToast();
        setToasts(toasts.concat(toast));
    };
    const removeToast = (removedToast) => {
        setToasts(toasts.filter((toast) => toast.id !== removedToast.id));
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
          label="Email"
          helpText="Enter the email associated with your account."
          isInvalid={Boolean(errors.email)}
          error={`Please enter a valid email.`}
        >
          <EuiFieldText
            icon="email"
            placeholder="user@wzl.rwth-aachen.de"
            value={form.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            aria-label="Enter the email associated with your account."
            isInvalid={Boolean(errors.email)}
          />
        </EuiFormRow>
        <EuiSpacer />
        <EuiButton type="submit" fill isLoading={isLoading}>
          Send
        </EuiButton>
      </EuiForm>

      <EuiSpacer size="xl" />

      <NeedAccountLink>
        Need an account? Sign up <Link to="/registration">here</Link>.
      </NeedAccountLink>
      <EuiSpacer size="m" />
      <ForgotPasswordLink>
        Did you remember it? Sign in <Link to="/login">here</Link>.
      </ForgotPasswordLink>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={removeToast}
        toastLifeTimeMs={6000}
      />
    </LoginFormWrapper>
  );
}
export default connect(
    (state) => ({
      error: state.password.error,
      isLoading: state.password.isLoading,
      data :  state.password.data
    }),
    {
      postRecover: passwordActions.postRecover
    }
  )(ForgotPasswordForm);

const getToast = () => {
const toasts = [
    {
    title: "The e-mail was sent successfully.",
    iconType: "email",
    color: "success",
    text: <p>Thanks for your patience!</p>
    }
];

return {
    id: `toast${toastId++}`,
    ...toasts[Math.floor(Math.random() * toasts.length)]
};
};
  