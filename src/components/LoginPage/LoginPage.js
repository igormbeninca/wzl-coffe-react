import React from "react";
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiTitle,
  EuiPageHeaderSection
} from "@elastic/eui";
import { LoginForm } from "../../components";
import styled from "styled-components";

const StyledEuiPage = styled(EuiPage)`
  flex: 1;
`;
const StyledEuiPageHeader = styled(EuiPageHeader)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;

  & h1 {
    font-size: 3.5rem;
  }
`;

export default function LoginPage() {
  return (
    <StyledEuiPage>
      <EuiPageBody component="section">
        <EuiPageContent verticalPosition="center" horizontalPosition="center">
          <EuiPageContentBody>
            <EuiFlexGroup direction="column" alignItems="center">
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
                <LoginForm />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </StyledEuiPage>
  );
}
