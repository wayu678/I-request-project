import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

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
        <Route path="/" element={<Demo />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/demo/createRequest" element={<CreateRequest />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/make-up-exam" element={<MakeUpExamForm />} />

        {/* Protected Routes */}
        <Route path="/profile/*" element={
          <ProtectedRoute>
            <ProfileRoutes />
          </ProtectedRoute>
        } />

        <Route path="/irst07" element={
          <ProtectedRoute>
            <RequestForPostponeTuitionandFeePayments />
          </ProtectedRoute>
        } />
        <Route path="/irst07/detail" element={
          <ProtectedRoute>
            <RequestForPostponeTuitionandFeePaymentsDetail />
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App;