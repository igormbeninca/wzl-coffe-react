import React from "react";
import { connect } from "react-redux";
import { Actions as purchaseActions } from "../../redux/purchase";
import { Actions as productActions } from "../../redux/product";
import { Actions as authActions } from "../../redux/auth";
import { useNavigate } from "react-router-dom";
import { htmlIdGenerator } from '@elastic/eui/lib/services';
import {
  EuiButton,
  EuiForm, 
  EuiFormRow,
  EuiSuperSelect,
  EuiRange,
} from "@elastic/eui";

function NewCoffeForm({
  isLoading,
  isLoadingProducts,
  data,
  fetchProducts,
  id_,
  logUserOut,
  newCoffe = async () => console.log("Added new purchase")
}) {
  // React.useEffect(() => {
  //   fetchProducts();
  // }, [fetchProducts]);
  const [form, setForm] = React.useState({
    id_product: id_,
    quantity: "1",
  });

  // Rest
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await newCoffe(form);
    if (res?.success) {
      //const purchase_id = res.data?.id;
      logUserOut();
      navigate("/login");
      // navigate(`/coffeanalytics/`);
      // redirect user to new cleaning job post
    } else {
      return;
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
    logUserOut: authActions.logUserOut,
  }
)(NewCoffeForm);


