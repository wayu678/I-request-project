import { Routes, Route } from "react-router-dom";
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

        {/* Routes with MainTemplate (with sidebar/header) - ทุกหน้ายกเว้น login */}
        <Route path="/" element={
          <MainTemplate>
            <Demo />
          </MainTemplate>
        } />
        <Route path="/demo" element={
          <MainTemplate>
            <Demo />
          </MainTemplate>
        } />
        <Route path="/demo/createRequest" element={
          <MainTemplate>
            <CreateRequest />
          </MainTemplate>
        } />
        <Route path="/demo/general-request" element={
          <MainTemplate>
            <CreateRequest />
          </MainTemplate>
        } />
        <Route path="/demo/registration-request" element={
          <MainTemplate>
            <CreateRequest />
          </MainTemplate>
        } />
        <Route path="/demo/leave-absence" element={
          <MainTemplate>
            <CreateRequest />
          </MainTemplate>
        } />
        <Route path="/demo/resignation" element={
          <MainTemplate>
            <CreateRequest />
          </MainTemplate>
        } />
        <Route path="/demo/change-faculty" element={
          <MainTemplate>
            <CreateRequest />
          </MainTemplate>
        } />
        <Route path="/demo/change-program" element={
          <MainTemplate>
            <CreateRequest />
          </MainTemplate>
        } />
        <Route path="/demo/transfer-credits" element={
          <MainTemplate>
            <CreateRequest />
          </MainTemplate>
        } />
        <Route path="/demo/master-request-type" element={
          <MainTemplate>
            <ManageRequestType />
          </MainTemplate>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <MainTemplate>
              <Dashboard />
            </MainTemplate>
          </ProtectedRoute>
        } />
        <Route path="/make-up-exam" element={
          <MainTemplate>
            <MakeUpExamForm />
          </MainTemplate>
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