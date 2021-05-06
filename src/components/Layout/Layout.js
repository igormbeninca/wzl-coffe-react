import React from "react";
import { Helmet } from "react-helmet";
import { Navbar, Sidebar } from "../../components";
import styled, { ThemeProvider } from "styled-components";
import euiVars from "@elastic/eui/dist/eui_theme_light.json";
import "@elastic/eui/dist/eui_theme_light.css";
import "../../assets/css/fonts.css";
import "../../assets/css/override.css";
import { EuiPageSideBar } from "@elastic/eui";

const customTheme = {
  ...euiVars,
  euiTitleColor: "#006BB4"
};

const StyledLayout = styled.div`
  width: 100%;
  max-width: 100vw;
  min-height: 100vh;
  /* background: linear-gradient(87deg, #8daedc 0, #3164a2 100%) !important; */
  display: flex;
  flex-direction: column;
`;

const StyledMain = styled.main`
  min-height: calc(100vh - ${(props) => props.theme.euiHeaderHeight} - 1px);
  display: flex;
  /* background: linear-gradient(87deg, #8daedc 0, #3164a2 100%) !important; */
  flex-direction: column;

  & h1 {
    color: ${(props) => props.theme.euiTitleColor};
  }
`;

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>WZL Coffe Analyser</title>
        <link rel="canonical" href="#" />
      </Helmet>
      <ThemeProvider theme={customTheme}>
        <StyledLayout>
          <Navbar />
          {/* <Sidebar /> */}
          <StyledMain>{children}</StyledMain>
        </StyledLayout>
      </ThemeProvider>
    </React.Fragment>
  );
}
