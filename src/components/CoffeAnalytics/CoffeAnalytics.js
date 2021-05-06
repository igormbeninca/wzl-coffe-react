import React from "react";
import CoffeCards from "./CoffeCards";
import LinePlot from "./LinePlot";
import {DatePicker} from "./DatePicker"
// https://stackoverflow.com/questions/58670980/react-context-typeerror-cannot-read-property-areresultsvisible-of-undefined
import { EuiFlexGroup, EuiFlexItem, EuiSpacer } from "@elastic/eui";

export default () => (
  <EuiFlexGroup gutterSize="none" direction="column">
    <EuiFlexItem>
      <EuiSpacer  size="s" />
      <CoffeCards />
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiSpacer size="s" />
      <LinePlot />
    </EuiFlexItem>
  </EuiFlexGroup>
);
