import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Actions as usersActions, UPDATE_USER_SUCCESS, FETCH_USERS_SUCCESS } from "../../redux/users";

import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
  EuiGlobalToastList,
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


let addToastHandler;
let toastId = 0;

export function addToast() {
  addToastHandler();
}


function AdminUserForm({
  regError,
  isLoading,
  updateUser,
  fetchUsers,
  current_user,
}) {
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({
    id:current_user.id,
    email: current_user.email,
    rfid: current_user.rfid,
    is_active: current_user.is_active,
    is_superuser: current_user.is_superuser,
    saldo : current_user.saldo,
    full_name: current_user.full_name,
    password: "",
  });

  // Toast
  const [toasts, setToasts] = React.useState([]);

  addToastHandler = () => {
    const toast = getToast();
    setToasts(toasts.concat(toast));
  };
  const removeToast = (removedToast) => {
    setToasts(toasts.filter((toast) => toast.id !== removedToast.id));
  };
  // Form
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    // // validate inputs before submitting
    // Object.keys(form).forEach((label) => validateInput(label, form[label]));
    // // if any input hasn't been entered in, return early
    // // if (!Object.values(form).every((value) => Boolean(value))) {
    // //   setErrors((errors) => ({
    // //     ...errors,
    // //     form: `You must fill out all fields.`
    // //   }));
    // //   return;
    // // }

    setHasSubmitted(true);
    const action = await updateUser(form.id,{
      email: form.email,
      password: form.password,
      full_name: form.full_name,
      rfid:form.rfid,
      is_active: form.is_active,
      is_superuser: form.is_superuser,
      saldo : form.saldo,
      password: "",
    });
    if (action.type == UPDATE_USER_SUCCESS)
        var action_ = await fetchUsers()
        if (action_.type == FETCH_USERS_SUCCESS)
            return;
    else
        addToast();
  };

  const getFormErrors = () => {
    const formErrors = [];
    if (regError && hasSubmitted) {
      formErrors.push(`Could not update user`);
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
            value={form.full_name}
            onChange={(e) => handleInputChange("full_name", e.target.value)}
            aria-label="First Name, Last Name"
            //isInvalid={Boolean(errors.username)}
          />
        </EuiFormRow>

        <EuiFormRow
          label="RFID"
          helpText="Scan the RFID associated with your account."
          isInvalid={Boolean(errors.rfid)}
          error={`Please enter a valid RFID.`}
        >
          <EuiFieldText
            icon="lock"
            placeholder="RFID"
            value={form.rfid}
            onChange={(e) => handleInputChange("rfid", e.target.value)}
            aria-label="Enter the rfid associated with this account."
            isInvalid={Boolean(errors.rfid)}
          />
        </EuiFormRow>

        <EuiFormRow
          label="Saldo"
          helpText="Enter the Saldo associated with this account."
          isInvalid={Boolean(errors.rfid)}
          error={`Please enter a valid number.`}
        >
          <EuiFieldText
            icon="currency"
            placeholder="0.00 $"
            value={form.saldo}
            onChange={(e) => handleInputChange("saldo", e.target.value)}
            aria-label="Enter the saldo associated with this account."
            isInvalid={Boolean(errors.rfid)}
          />
        </EuiFormRow>

        <EuiFormRow
          label="Super user"
        >
          <EuiSwitch
            checked={form.is_superuser}
            onChange={(e) => handleInputChange("is_superuser", e.target.checked)}
          />
        </EuiFormRow>

        <EuiSpacer />
        <EuiButton isLoading={isLoading} type="submit" fill>
          Update
        </EuiButton>
      </EuiForm>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={removeToast}
        toastLifeTimeMs={6000}
      />
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
    regError: state.users.error,
    isLoading: state.users.isLoading,
  }),
  {
    updateUser: usersActions.updateUser,
    fetchUsers: usersActions.fetchUsers,
  }
)(AdminUserForm);

const getToast = () => {
    const toasts = [
      {
        title: "Could not concluded purchase!",
        iconType: "alert",
        color: "danger",
        text: <p>Thanks for your patience!</p>
      }
    ];
  
    return {
      id: `toast${toastId++}`,
      ...toasts[Math.floor(Math.random() * toasts.length)]
    };
  };