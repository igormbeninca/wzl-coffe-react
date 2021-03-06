import React from "react";
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
} from "@elastic/eui";
import { RegistrationForm } from "../../components";
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

export default function RegistrationPage() {
  return (
    <StyledEuiPage>
      <EuiPageBody component="section">
        <EuiPageContent verticalPosition="center" horizontalPosition="center">
          <EuiPageContentBody>
          <EuiFlexGroup direction="column" alignItems="center">
              <EuiFlexItem>
                <EuiPageHeaderSection>
                <EuiTitle size="m">
                    <h1>Sign up</h1>
                    </EuiTitle>
                </EuiPageHeaderSection>
              </EuiFlexItem>
              <EuiFlexItem>
                <RegistrationForm />
              </EuiFlexItem>
          </EuiFlexGroup>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </StyledEuiPage>
  );
}
