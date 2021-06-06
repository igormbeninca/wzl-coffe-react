import React from "react";
import { connect } from "react-redux";
import { Actions as purchaseActions } from "../../redux/purchase";
import { Actions as productActions } from "../../redux/product";
import { useNavigate } from "react-router-dom";
import { htmlIdGenerator } from '@elastic/eui/lib/services';
import {
  EuiButton,
  EuiForm, 
  EuiFormRow,
  EuiGlobalToastList,
  EuiSuperSelect,
  EuiRange,
} from "@elastic/eui";

let addToastHandler;
let toastId = 0;

export function addToast() {
  addToastHandler();
}

function NewCoffeForm({
  isLoading,
  isLoadingProducts,
  data,
  fetchProducts,
  id_,
  newCoffe = async () => console.log("Added new purchase")
}) {
  // React.useEffect(() => {
  //   fetchProducts();
  // }, [fetchProducts]);

  const [form, setForm] = React.useState({
    id_product: id_,
    quantity: "1",
  });

  // const products_option = [];
  // data.forEach(element => {
  //   products_option.push({
  //     value: "" + element.id, 
  //     inputDisplay: element.name + " - " + element.price + " €",})
  // });
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
    const res = await newCoffe(form);
    if (res?.success) {
      //const purchase_id = res.data?.id;
      navigate(`/coffeanalytics/`);
      // redirect user to new cleaning job post
    } else {
      addToast();
    }
  };
  // Range slider

  const handleInputChange = (label, value) => {
    //validateInput(label, value);

    setForm((form) => ({ ...form, [label]: value }));
  };

  return (
    <>
      <EuiForm component="form" onSubmit={handleSubmit}>
        {/* <EuiFormRow
          label="Select your Product">
          <EuiSuperSelect
            options={products_option}
            isLoading = {isLoadingProducts}
            valueOfSelected={form.id_product}
            fullWidth={true}
            onChange={(value) => handleInputChange("id_product", value)}
          />
        </EuiFormRow> */}
        <EuiFormRow label="Quantity">
          <EuiRange
            id={htmlIdGenerator()()}
            max = {20}
            min = {1}
            value={form.quantity}
            onChange={(e) => handleInputChange("quantity", e.target.value)}
            showInput
            showRange
            fullWidth={true}
            tickInterval={1}
        />
        </EuiFormRow>
        <EuiButton
            type="submit"
            color="secondary" 
            isLoading={isLoading}
            fill
            fullWidth={true}
            iconSide="left"
            iconType="plusInCircle"
            error={`Please enter a valid input.`}
          >
            Buy
          </EuiButton>
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
    data: state.product.data,
    isLoadingProducts: state.product.isLoading,
    isLoading: state.purchase.isLoading
  }),
  {
    newCoffe: purchaseActions.postPuchase,
    fetchProducts: productActions.fetchProducts,
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
