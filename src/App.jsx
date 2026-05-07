import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import ActivitiesPage from "./activities/ActivitiesPage";
import ActivityDetails from "./activities/ActivityDetails.jsx";

import RoutinesPage from "./routines/RoutinesPage";
import RoutineDetails from "./routines/RoutineDetails";

import Login from "./auth/Login";
import Register from "./auth/Register";
import Error404 from "./Error404";

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

          {/* Activities */}
          <Route path="activities/:id" element={<ActivityDetails />} />

          {/* Routines */}
          <Route path="routines" element={<RoutinesPage />} />
          <Route path="routines/:id" element={<RoutineDetails />} />

          {/* Catch-all */}
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
