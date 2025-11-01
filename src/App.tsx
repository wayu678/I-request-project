import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainTemplate from "./layout";

import NotFound from "./pages/NotFound";
import { Login } from "./pages/login";
import ProfileRoutes from "./pages/profile";

import {
  RequestForPostponeTuitionandFeePayments,
  RequestForPostponeTuitionandFeePaymentsDetail
} from "./pages/irst07";

import MakeUpExamForm from "./components/MakeUpExamForm";

import { Dashboard } from "./pages/dashboard";
import ManageAccount from "./pages/manageAccount";
import { ManageRequestType } from "./pages/manageRequestType";
import { ManageMasterValue } from "./pages/manageMasterValue";
import GeneralRequestRoutes from "./pages/requests/irst05";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Routes without MainTemplate (no sidebar/header) - เฉพาะหน้า login */}
        <Route path="/login" element={<Login />} />

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <MainTemplate>
              <Dashboard />
            </MainTemplate>
          </ProtectedRoute>
        } />
        <Route path="/make-up-exam" element={
          <ProtectedRoute>
            <MainTemplate>
              <MakeUpExamForm />
            </MainTemplate>
          </ProtectedRoute>
        } />

        {/* Protected Routes with MainTemplate */}
        <Route path="/profile/*" element={
          <ProtectedRoute>
            <MainTemplate>
              <ProfileRoutes />
            </MainTemplate>
          </ProtectedRoute>
        } />

        <Route path="/irst05/*" element={
          <ProtectedRoute>
            <MainTemplate>
              <GeneralRequestRoutes />
            </MainTemplate>
          </ProtectedRoute>
        } />

        <Route path="/irst07/postpone-tuition-and-fee-payments" element={
          <ProtectedRoute>
            <MainTemplate>
              <RequestForPostponeTuitionandFeePayments />
            </MainTemplate>
          </ProtectedRoute>
        } />
        <Route path="/irst07/postpone-tuition-and-fee-payments/detail" element={
          <ProtectedRoute>
            <MainTemplate>
              <RequestForPostponeTuitionandFeePaymentsDetail />
            </MainTemplate>
          </ProtectedRoute>
        } />

        {/* Master Data Routes */}
        <Route path="/demo/master-account" element={
          <ProtectedRoute>
            <MainTemplate>
              <ManageAccount />
            </MainTemplate>
          </ProtectedRoute>
        } />

        <Route path="/demo/master-request-type" element={
          <ProtectedRoute>
            <MainTemplate>
              <ManageRequestType />
            </MainTemplate>
          </ProtectedRoute>
        } />

        <Route path="/demo/master-value" element={
          <ProtectedRoute>
            <MainTemplate>
              <ManageMasterValue />
            </MainTemplate>
          </ProtectedRoute>
        } />

        <Route path="*" element={
          <ProtectedRoute>
            <MainTemplate>
              <NotFound />
            </MainTemplate>
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default App;