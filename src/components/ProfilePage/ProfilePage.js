import React from "react"
import { connect } from "react-redux"
import {
  EuiAvatar,
  EuiHorizontalRule,
  EuiIcon,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiText
} from "@elastic/eui"
import moment from "moment"
import styled from "styled-components"

const StyledEuiPage = styled(EuiPage)`
  flex: 1;
`
const StyledEuiPageHeader = styled(EuiPageHeader)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;

  & h1 {
    font-size: 3.5rem;
  }
`
const StyledEuiPageContentBody = styled(EuiPageContentBody)`
  display: flex;
  flex-direction: column;
  align-items: center;

  & h2 {
    margin-bottom: 1rem;
  }
`

function ProfilePage({ user }) {
  return (
    <StyledEuiPage>
      <EuiPageBody component="section">
        <StyledEuiPageHeader>
          <EuiPageHeaderSection>
            {/* <EuiTitle size="l">
              <h1>Profile</h1>
            </EuiTitle> */}
          </EuiPageHeaderSection>
        </StyledEuiPageHeader>
        <EuiPageContent verticalPosition="center" horizontalPosition="center">
          <StyledEuiPageContentBody>
            <EuiAvatar
              size="xl"
              iconSize="xxl"
              name={user.full_name || user.full_name || "Anonymous"}
              initialsLength={2}
              iconType={"user"}
              color="#006bb4"
            />
            <EuiTitle size="l">
              <h2>@{user.full_name}</h2>
            </EuiTitle>
            <EuiText>
              <p>
                <EuiIcon type="email" /> {user.email}
              </p>
              {/* <p>
                <EuiIcon type="clock" /> member since {moment(user.email).format("MM-DD-YYYY")}
              </p> */}
              <p>
                <EuiIcon type="currency" />{" "}
                {user.saldo ? user.saldo + " €" : "No Saldo"}
              </p>
              <p>
                <EuiIcon type="number" />{" "}
                {user.id ? user.id : "No Id"}
              </p>
              <EuiHorizontalRule />
              <p>
                <EuiIcon type="quote" />{" "}
                {"Morar na Alemanha é todo dia um 7x1 diferente"}
              </p>
            </EuiText>
          </StyledEuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </StyledEuiPage>
  )
}

export default connect((state) => ({ user: state.auth.user }))(ProfilePage)

