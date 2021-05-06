import React from "react";
import { connect } from "react-redux";
import { Actions as purchaseActions } from "../../redux/purchase";
import { useNavigate } from "react-router-dom";
import {
  EuiButton,
  EuiForm,
  EuiGlobalToastList,
  EuiFlexGroup,
  EuiFlexItem
} from "@elastic/eui";

let addToastHandler;
let toastId = 0;

export function addToast() {
  addToastHandler();
}

function NewCoffeForm({
  isLoading,
  newCoffe = async () => console.log("New Coffe Created")
}) {
  const form = React.useState({
    id_product: "1"
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
  // Rest
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await newCoffe(...form);
    if (res?.success) {
      //const purchase_id = res.data?.id;
      navigate(`/coffeanalytics/`);
      // redirect user to new cleaning job post
    } else {
      addToast();
    }
  };

  return (
    <>
      <EuiForm component="form" onSubmit={handleSubmit}>
        <EuiFlexGroup direction="column" alignItems="center">
          <EuiFlexItem>
            <EuiButton
              type="submit"
              isLoading={isLoading}
              fill
              iconSide="left"
              iconType="plusInCircle"
              error={`Please enter a valid input.`}
            >
              Yes
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiForm>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={removeToast}
        toastLifeTimeMs={6000}
      />
    </>
  );
}

export default connect(
  (state) => ({
    user: state.auth.user,
    isLoading: state.purchase.isLoading
  }),
  {
    newCoffe: purchaseActions.postPuchase
  }
)(NewCoffeForm);

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
