import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./layout/Layout";

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

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Routes without Layout (no sidebar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Demo />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/demo/createRequest" element={<CreateRequest />} />

        {/* Routes with Layout (with sidebar) */}
        <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/make-up-exam" element={
          <Layout>
            <MakeUpExamForm />
          </Layout>
        } />

        {/* Protected Routes with Layout */}
        <Route path="/profile/*" element={
          <ProtectedRoute>
            <Layout>
              <ProfileRoutes />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/irst07" element={
          <ProtectedRoute>
            <Layout>
              <RequestForPostponeTuitionandFeePayments />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/irst07/detail" element={
          <ProtectedRoute>
            <Layout>
              <RequestForPostponeTuitionandFeePaymentsDetail />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App;