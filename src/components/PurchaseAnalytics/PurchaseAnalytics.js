import React from "react";
import PurchaseCharts from "./PurchaseCharts";

// https://stackoverflow.com/questions/58670980/react-context-typeerror-cannot-read-property-areresultsvisible-of-undefined
import { EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiPanel } from "@elastic/eui";

export default () => (
  <EuiPanel paddingSize="s" hasShadow={false} hasBorder={false}>
    <EuiFlexGroup gutterSize="none" direction="column">
      <EuiFlexItem>
        <EuiSpacer size="s" />
        <PurchaseCharts />
      </EuiFlexItem>
    </EuiFlexGroup>
  </EuiPanel>
);
