import React from "react";

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon
} from "@elastic/eui";
import styled from "styled-components";
import notFoundSvg from "../../assets/img/day100-the-snail.svg";

const StyledEuiPage = styled(EuiPage)`
  flex: 1;
  padding-bottom: 5rem !important;
`;
const LandingTitle = styled.h1`
  font-size: 2rem;
  color: black !important;
  // margin: 2rem 0;
`;

const StyledEuiPageContent = styled(EuiPageContent)`
  border-radius: 100% !important;
  max-width: 400px !important;
  max-height: 400px !important;
`;
const StyledEuiPageContentBody = styled(EuiPageContentBody)`
  max-width: 300px !important;
  max-height: 300px !important;
  & > img {
    width: 100% !important;
    border-radius: 100% !important;
  }
`;

export default function NotFoundPage() {
  return (
    <StyledEuiPage>
      <EuiPageBody component="section">
      <EuiPageContent
          verticalPosition="center"
          horizontalPosition="center"
          paddingSize="none"
          hasShadow={false}
          borderRadius="none"
          color="subdued"
        >
        <EuiFlexGroup alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiIcon size="xxl"  color="danger" type="alert"/>
            </EuiFlexItem>
            <EuiFlexItem>
                <LandingTitle>Something went wrong.</LandingTitle>
              </EuiFlexItem>
        </EuiFlexGroup>        
        </EuiPageContent>

        <EuiFlexGroup direction="rowReverse">
          <EuiFlexItem>
          <StyledEuiPageContent
              horizontalPosition="center"
              verticalPosition="center"
            >
              <StyledEuiPageContentBody>
                <img src={notFoundSvg} alt="notFound" />
              </StyledEuiPageContentBody>
            </StyledEuiPageContent>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageBody>
    </StyledEuiPage>
  );
}
