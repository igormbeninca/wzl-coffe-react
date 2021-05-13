import React from "react";
import { connect } from "react-redux";
import { Actions as purchaseActions } from "../../redux/purchase";
import { Actions as authActions } from "../../redux/auth";

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
  var size = Object.keys(data).length;
  var saldo = user.saldo;
  var avg_coffe_arr = new Array();
  var avg_coffe = 0;
  data.forEach((element, index) => {
    if (index != 0) {
      if (
        Date.parse(element.time_stamp) -
          avg_coffe_arr[avg_coffe_arr.length - 1][0] >
        8.64e7
      ) {
        avg_coffe_arr.push([Date.parse(element.time_stamp), 1]);
      } else {
        avg_coffe_arr[avg_coffe_arr.length - 1][1] += 1;
      }
    } else {
      avg_coffe_arr.push([Date.parse(element.time_stamp), 1]);
    }
    avg_coffe += 1;
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
      <EuiFlexGroup gutterSize="s" direction="column">
        <EuiFlexItem>
          <DatePicker/> 
        </EuiFlexItem>
        <EuiSpacer size = "s"/>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiCard
              icon={<EuiIcon size="xxl" type="monitoringApp" />}
              title="Total Coffees"
              description={size + " Cups"}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              icon={<EuiIcon size="xxl" type="stats" />}
              title="Avg. Coffees per Day"
              description={Math.round(avg_coffe/avg_coffe_arr.length,2) + " Cups"}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              icon={<EuiIcon size="xxl" type="currency" />}
              title="Saldo"
              description={saldo + " €"}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
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
