import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  LandingPage,
  ProtectedRoute,
  ProfilePage,
  NotFoundPage,
  RegistrationPage,
  PurchaseAnalytics,
  NewCoffe,
  Layout,
  AdminPage,
  ForgotPasswordPage,
  ResetPasswordPage,
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
            element={<ProtectedRoute component={PurchaseAnalytics} />}
          />
          <Route path="*" element={<LandingPage />} />
          <Route
            path="/newcoffe"
            element={<ProtectedRoute component={NewCoffe} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage/>}/>
          <Route
            path="/profile"
            element={<ProtectedRoute component={ProfilePage} />}
          />
          <Route
            path="/adminPanel"
            element={<ProtectedRoute component={AdminPage} />}
          />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
