import { Routes, Route } from "react-router-dom";

import NotFound from "./pages/NotFound";
import { Login } from "./pages/login";

import {
  RequestForPostponeTuitionandFeePayments,
  RequestForPostponeTuitionandFeePaymentsDetail
} from "./pages/irst07";

import MakeUpExamForm from "./components/MakeUpExamForm";

import { Demo } from "./pages/demo";
import CreateRequest from "./pages/demo/createRequest";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Demo />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/demo/createRequest" element={<CreateRequest />} />
      <Route path="/login" element={<Login />} />
      <Route path="/make-up-exam" element={<MakeUpExamForm />} />
      <Route path="/irst07">
        <Route path="" element={<RequestForPostponeTuitionandFeePayments />} />
        <Route path="detail" element={<RequestForPostponeTuitionandFeePaymentsDetail />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App;
