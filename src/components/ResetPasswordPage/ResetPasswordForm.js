import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Actions as passwordActions
} from "../../redux/password";
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
import { htmlIdGenerator } from "@elastic/eui/lib/services";
import styled from "styled-components";
import { useParams } from "react-router-dom"

const ResetPasswordFormWrapper = styled.div`
  padding: 2rem;
`;
const NeedAccountLink = styled.span`
  font-size: 0.8rem;
`;

function ResetPasswordForm({
  isLoading,
  error,
  data,
  resetPassword,
}) {
  const { token } = useParams()

  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const [form, setForm] = React.useState({
    password: "",
    passwordConfirm: ""
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
//   React.useEffect(() => {
//     if (data && !isLoading && !error) {
//       navigate("/");
//       return(
//         <ResetPasswordFormWrapper>
//             <EuiFieldText>
//                 Fuck you
//             </EuiFieldText>
//       </ResetPasswordFormWrapper>
//       );
//     }
//   }, [data]);

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

    setHasSubmitted(true);
    const action = await resetPassword({
      token: token,
      new_password: form.password,
    });
    if (action?.success && !isLoading){
      setForm((form) => ({ ...form, password: "", passwordConfirm: "" }));
      navigate("/login");
    }
    //else navigate("/login");
  };

  const getFormErrors = () => {
    const formErrors = [];
    if (error && hasSubmitted && !isLoading) {
      formErrors.push(`Could not reset password`);
    }
    if (errors.form) {
      formErrors.push(errors.form);
    }
    return formErrors;
  };

  return (
    <ResetPasswordFormWrapper>
      <EuiForm
        component="form"
        onSubmit={handleSubmit}
        isInvalid={Boolean(getFormErrors().length)}
        error={getFormErrors()}
      >
        <EuiFormRow
          label="Password"
          helpText="Enter your new password."
          isInvalid={Boolean(errors.password)}
          error={`Password must be at least 7 characters.`}
        >
          <EuiFieldPassword
            placeholder="••••••••••••"
            value={form.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            type="dual"
            aria-label="Enter your new password."
            isInvalid={Boolean(errors.password)}
          />
        </EuiFormRow>
        <EuiFormRow
          label="Confirm new password"
          helpText="Confirm your new password."
          isInvalid={Boolean(errors.passwordConfirm)}
          error={`Passwords must match.`}
        >
          <EuiFieldPassword
            placeholder="••••••••••••"
            value={form.passwordConfirm}
            onChange={(e) => handlePasswordConfirmChange(e.target.value)}
            type="dual"
            aria-label="Confirm your new password."
            isInvalid={Boolean(errors.passwordConfirm)}
          />
        </EuiFormRow>
        <EuiSpacer />
        <EuiButton type="submit" fill>
          Confirm
        </EuiButton>
      </EuiForm>
    </ResetPasswordFormWrapper>
  );
}

export default connect(
  (state) => ({
    error: state.password.error,
    isLoading: state.password.isLoading,
    data: state.password.data
  }),
  {
    resetPassword: passwordActions.postReset
  }
)(ResetPasswordForm);
