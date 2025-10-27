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

import { Demo } from "./pages/demo";
import CreateRequest from "./pages/demo/createRequest";
import { Dashboard } from "./pages/dashboard";
import { ManageRequestType } from "./pages/manageRequestType";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Routes without MainTemplate (no sidebar/header) - เฉพาะหน้า login */}
        <Route path="/login" element={<Login />} />

        {/* หน้าแรก - redirect ไป login อัตโนมัติ */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Protected Routes with MainTemplate - Demo Pages */}
        <Route path="/demo" element={
          <ProtectedRoute>
            <MainTemplate>
              <Demo />
            </MainTemplate>
          </ProtectedRoute>
        } />
        <Route path="/demo/createRequest" element={
          <ProtectedRoute>
            <MainTemplate>
              <CreateRequest />
            </MainTemplate>
          </ProtectedRoute>
        } />
        <Route path="/demo/general-request" element={
          <ProtectedRoute>
            <MainTemplate>
              <CreateRequest />
            </MainTemplate>
          </ProtectedRoute>
        } />
        <Route path="/demo/registration-request" element={
          <ProtectedRoute>
            <MainTemplate>
              <CreateRequest />
            </MainTemplate>
          </ProtectedRoute>
        } />
        <Route path="/demo/leave-absence" element={
          <ProtectedRoute>
            <MainTemplate>
              <CreateRequest />
            </MainTemplate>
          </ProtectedRoute>
        } />
        <Route path="/demo/resignation" element={
          <ProtectedRoute>
            <MainTemplate>
              <CreateRequest />
            </MainTemplate>
          </ProtectedRoute>
        } />
        <Route path="/demo/change-faculty" element={
          <ProtectedRoute>
            <MainTemplate>
              <CreateRequest />
            </MainTemplate>
          </ProtectedRoute>
        } />
        <Route path="/demo/change-program" element={
          <ProtectedRoute>
            <MainTemplate>
              <CreateRequest />
            </MainTemplate>
          </ProtectedRoute>
        } />
        <Route path="/demo/transfer-credits" element={
          <ProtectedRoute>
            <MainTemplate>
              <CreateRequest />
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

        <Route path="/irst07" element={
          <ProtectedRoute>
            <MainTemplate>
              <RequestForPostponeTuitionandFeePayments />
            </MainTemplate>
          </ProtectedRoute>
        } />
        <Route path="/irst07/detail" element={
          <ProtectedRoute>
            <MainTemplate>
              <RequestForPostponeTuitionandFeePaymentsDetail />
            </MainTemplate>
          </ProtectedRoute>
        } />

        <Route path="*" element={
          <MainTemplate>
            <NotFound />
          </MainTemplate>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default App;