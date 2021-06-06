import React from "react";
import CoffeCards from "./CoffeCards";
import LinePlot from "./LinePlot";

// https://stackoverflow.com/questions/58670980/react-context-typeerror-cannot-read-property-areresultsvisible-of-undefined
import { EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiPanel } from "@elastic/eui";

export default () => (
  <EuiPanel paddingSize="s" hasShadow={false} hasBorder={false}>
    <EuiFlexGroup gutterSize="none" direction="column">
      <EuiFlexItem>
          <CoffeCards />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiSpacer size="s" />
        <LinePlot />
      </EuiFlexItem>
    </EuiFlexGroup>
  </EuiPanel>
);
