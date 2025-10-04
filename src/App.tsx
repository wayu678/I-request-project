import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { Login } from "./pages/login";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
