import { Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import EditProfile from "./EditProfile";

const ProfileRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/edit" element={<EditProfile />} />
        </Routes>
    );
};

export default ProfileRoutes;
