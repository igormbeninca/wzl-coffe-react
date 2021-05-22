import React, { useState } from "react";
import { connect } from "react-redux";
import { Actions as productActions } from "../../redux/product";
import { Actions as purchaseActions } from "../../redux/purchase";
import moment from 'moment';
import {   EuiSelect, EuiDatePicker, EuiDatePickerRange,  EuiFlexGroup, EuiFlexItem } from "@elastic/eui";

function ProductDropDownMenu({
  isLoading,
  data,
  fetchProducts,
  fetchPurchases,
}) {

  const [startDate, setStartDate] = useState(moment("2021-01-01T00:00"));
  const [endDate, setEndDate] = useState(moment());
  const [selectedOptions, setSelected] = useState(1);
  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  React.useEffect(() => {
    fetchPurchases(selectedOptions, startDate.format("YYYY-MM-DDT00:00:00.000000"),endDate.format("YYYY-MM-DDT23:59:00.000000") )
  }, [fetchPurchases,startDate, endDate, selectedOptions]);



  const products_option = [];
  data.forEach(element => {
    products_option.push({value:element.id, text:element.name})
  });

  const onChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <EuiFlexGroup gutterSize="s" direction="column">
      <EuiFlexItem>
        <EuiSelect
          options={products_option}
          isLoading = {isLoading}
          value={selectedOptions}
          onChange={(e) => onChange(e)}
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiDatePickerRange
          startDateControl={
            <EuiDatePicker
              selected={startDate}
              onChange={setStartDate}
              startDate={startDate}
              endDate={endDate}
              isInvalid={startDate > endDate}
              aria-label="Start date"
              //showTimeSelect
            />
          }
          endDateControl={
            <EuiDatePicker
              selected={endDate}
              onChange={setEndDate}
              startDate={startDate}
              endDate={endDate}
              isInvalid={startDate > endDate}
              aria-label="End date"
              //showTimeSelect
            />
          }
        />
      </EuiFlexItem>
    </EuiFlexGroup>  
  );
};

export default connect(
  (state) => ({
    data: state.product.data,
    isLoading: state.purchase.isLoading,
    current_product: state.product.current_product
  }),
  {
    fetchProducts: productActions.fetchProducts,
    fetchPurchases: purchaseActions.fetchPurchases,
  }
)(ProductDropDownMenu);

// const options = [
//   {
//     label: "Coffee"
//   },
//   {
//     label: "Bier"
//   },
//   {
//     label: "Berliner"
//   }
// ];