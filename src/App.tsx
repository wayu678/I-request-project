import { Routes, Route } from "react-router-dom";

import NotFound from "./pages/NotFound";

import { Login } from "./pages/login";
import { RequestForMakeUpExam, RequestForMakeUpExamDetail } from "./pages/irst04";
import { Demo } from "./pages/demo";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Demo />} />
      <Route path="/login" element={<Login />} />

      <Route path="/irst04">
        <Route path="" element={<RequestForMakeUpExam />} />
        <Route path="detail" element={<RequestForMakeUpExamDetail />} />
      </Route>

      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}

export default App
