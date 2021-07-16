import React, {Fragment} from "react";
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiSwitch,
  EuiTitle,
  EuiPageHeaderSection
} from "@elastic/eui";
import { LoginForm, LoginFormEmail } from "../../components";
import styled from "styled-components";

const StyledEuiPage = styled(EuiPage)`
  flex: 1;
`;
const StyledEuiSwitch = styled(EuiSwitch)`
  font-weight: bold;
`;

export default function LoginPage() {

  const [checked, setChecked] = React.useState(true);
  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <StyledEuiPage>
      <EuiPageBody component="section">
        <EuiPageContent verticalPosition="center" horizontalPosition="center">
          <EuiPageContentBody>
          <EuiFlexGroup gutterSize="s" direction="column" alignItems="flexStart">
            <EuiFlexItem>
              <StyledEuiSwitch
                labelProps={["Bold"]}
                label="RFID"
                checked={checked}
                onChange={(e) => onChange(e)}
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexGroup gutterSize="none" direction="column" alignItems="center">
                <EuiFlexItem>
                  {/* <EuiIcon
                    type="https://www.wzl.rwth-aachen.de/global/show_picture.asp?id=aaaaaaaaabdlfcs"
                    color="primary"
                    size="original"
                  /> */}
                  <EuiPageHeaderSection>
                    <EuiTitle size="m">
                      <h1>Log in</h1>
                      </EuiTitle>
                  </EuiPageHeaderSection>
                </EuiFlexItem>
                <EuiFlexItem>
                  {checked?<LoginForm />:<LoginFormEmail />}
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </StyledEuiPage>    
  );
}
