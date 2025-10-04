import { Routes, Route } from "react-router-dom";

import NotFound from "./pages/NotFound";
import { LoginPim } from "./pages/login";

import { 
  RequestForPostponeTuitionandFeePayments,
  RequestForPostponeTuitionandFeePaymentsDetail
} from "./pages/irst07";

import { Demo } from "./pages/demo";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Demo />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/login" element={<LoginPim />} />

      <Route path="/irst07">
        <Route path="" element={<RequestForPostponeTuitionandFeePayments />} />
        <Route path="detail" element={<RequestForPostponeTuitionandFeePaymentsDetail />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App;
