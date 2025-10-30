import { Routes, Route } from "react-router-dom";
import GeneralRequest from "./GeneralRequest";

const GeneralRequestRoutes = () => {
    return (
        <div className="p-4">
            <Routes>
                <Route path="/general-request" element={<GeneralRequest />} />
            </Routes>
        </div>
    );
};

export default GeneralRequestRoutes;
