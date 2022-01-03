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
  EuiFieldNumber,
  EuiButtonIcon,
  EuiSuperSelect,
  EuiRange,
  EuiFlexGroup,
  EuiFlexItem,
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
  const addQuantity = () => {
    const value = parseInt(form.quantity) + 1;
    setForm((form) => ({ ...form, ["quantity"]: value }));
  }
  const subQuantity = () => {
    const value = parseInt(form.quantity) - 1;
    setForm((form) => ({ ...form, ["quantity"]: value }));
  }

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
          {/* <EuiRange
            id={htmlIdGenerator()()}
            max = {20}
            min = {1}
            value={form.quantity}
            onChange={(e) => handleInputChange("quantity", e.target.value)}
            showInput
            showRange
            fullWidth={true}
            tickInterval={1}
        /> */}
            <EuiFlexGroup gutterSize="s" direction="row" justifyContent="center">
              <EuiFlexItem grow={false}>
                <EuiButtonIcon
                  display="base"
                  iconType="arrowLeft"
                  iconSize="l"
                  size="m"
                  aria-label="Next"
                  onClick={(e) => subQuantity()}
                />
              </EuiFlexItem>
              <EuiFlexItem >
                <EuiFieldNumber
                  placeholder="Quantity you want to buy"
                  value={form.quantity}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                  step={1}
                  max={20}
                  min={1}
                />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonIcon
                  display="base"
                  iconType="arrowRight"
                  iconSize="l"
                  size="m"
                  aria-label="Next"
                  onClick={(e) => addQuantity()}
                />
              </EuiFlexItem>
            </EuiFlexGroup>
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


