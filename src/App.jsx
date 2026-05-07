import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import ActivitiesPage from "./activities/ActivitiesPage";
import ActivityDetails from "./activities/ActivityDetails.jsx";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Error404 from "./Error404";
/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
 * discover new routines. Anyone can browse the site and make an account, and users with an
 * account will be able to upload and manage their own activities.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout route */}
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<ActivitiesPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Dynamic activity page */}
          <Route path="activities/:id" element={<ActivityDetails />} />

          {/* Catch-all */}
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
