import React from "react";
import { connect } from "react-redux";
import { Actions as purchaseActions } from "../../redux/purchase";
import { Actions as authActions } from "../../redux/auth";

import ProductDropDownMenu from "./ProductDropDownMenu"
import DatePicker from "./DatePicker"

import {
  EuiLoadingSpinner,
  EuiCard,
  EuiIcon,
  EuiFlexGroup,
  EuiSpacer,
  EuiFlexItem
} from "@elastic/eui";

function CoffeCards({ user, isLoading, data, fetchPurchases, fetchUser }) {
  React.useEffect(() => {
    //fetchPurchases();
    fetchUser();
  }, [fetchUser]);

  if (isLoading) return <EuiLoadingSpinner size="xl" />;
  var saldo = user.saldo.toFixed(2);
  var avg_coffe_arr = [];
  var total_product = 0;
  data.forEach((element, index) => {
    if (index != 0) {
      if (
        Date.parse(element.time_stamp) -
          avg_coffe_arr[avg_coffe_arr.length - 1] >
        8.64e7
      ) {
        avg_coffe_arr.push(Date.parse(element.time_stamp));
      } 
    } else {
      avg_coffe_arr.push(Date.parse(element.time_stamp));
    }
    total_product += element.quantity;
  });
  // if (avg_coffe_arr.length) {
  //   console.log(avg_coffe/ avg_coffe_arr.length);
  //   avg_coffe = avg_coffe / avg_coffe_arr.length;
  // }
  return (
    <EuiCard
      layout="horizontal"
      title="Avg. Statistics"
      // icon={<EuiIcon size="original" type={"bolt"} />}
    >
        <ProductDropDownMenu/>
        <EuiSpacer size = "s"/>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiCard
              layout="horizontal"
              icon={<EuiIcon size="xxl" type="globe" />}
              title="Total"
              description={total_product===0? "0" :  total_product}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              layout="horizontal"
              icon={<EuiIcon size="xxl" type="stats" />}
              title="Avg. per Day"
              description={total_product===0? "0" : Math.round(total_product/avg_coffe_arr.length,2)}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              layout="horizontal"
              icon={<EuiIcon size="xxl" type="currency" />}
              title="Saldo"
              description={saldo + " €"}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
    </EuiCard>
  );
}

export default connect(
  (state) => ({
    isLoading: state.purchase.isLoading,
    data: state.purchase.data,
    user: state.auth.user
  }),
  {
    //fetchPurchases: purchaseActions.fetchPurchases,
    fetchUser: authActions.fetchUserFromToken
  }
)(CoffeCards);
