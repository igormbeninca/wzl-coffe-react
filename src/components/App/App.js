import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  LandingPage,
  ProtectedRoute,
  ProfilePage,
  NotFoundPage,
  RegistrationPage,
  CoffeAnalytics,
  NewCoffe,
  Layout
} from "../../components";

//basename={process.env.PUBLIC_URL}

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/coffeanalytics"
            element={<ProtectedRoute component={CoffeAnalytics} />}
          />
          <Route path="*" element={<LandingPage />} />
          <Route
            path="/newcoffe"
            element={<ProtectedRoute component={NewCoffe} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route
            path="/profile"
            element={<ProtectedRoute component={ProfilePage} />}
          />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
