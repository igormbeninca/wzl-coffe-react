import React from "react";
import { connect } from "react-redux";
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiFlexGroup,
  EuiFlexItem
} from "@elastic/eui";
import coffe from "../../assets/img/coffe.svg";
import styled from "styled-components";
import NewCoffeForm from "./NewCoffeForm";

const StyledEuiPage = styled(EuiPage)`
  flex: 1;
  padding-bottom: 15rem !important;
`;

const StyledEuiPageContent = styled(EuiPageContent)`
  border-radius: 50% !important;
  max-width: 370px !important;
  max-height: 370px !important;
`;
const StyledEuiPageContentBody = styled(EuiPageContentBody)`
  max-width: 370px !important;
  max-height: 370px !important;
  & > img {
    width: 100% !important;
    border-radius: 50% !important;
  }
`;

const LandingTitle = styled.h1`
  font-size: 3rem;
  font-weight:normal;
  margin: 2rem 0;
`;

// Styling //

function NewCoffe({ user }) {
  return (
    <StyledEuiPage>
      <EuiPageBody component="section">
        <EuiFlexGroup direction="column" alignItems="center">
          <EuiFlexItem>
            <LandingTitle>{"New Coffe?"}</LandingTitle>
          </EuiFlexItem>
          <EuiFlexItem>
            <StyledEuiPageContent
              horizontalPosition="center"
              verticalPosition="center"
            >
              <StyledEuiPageContentBody>
                <img src={coffe} alt="coffe" />
              </StyledEuiPageContentBody>
            </StyledEuiPageContent>
          </EuiFlexItem>
          <EuiFlexItem>
            <NewCoffeForm />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageBody>
    </StyledEuiPage>
  );
}

export default connect((state) => ({ user: state.auth.user }))(NewCoffe);
