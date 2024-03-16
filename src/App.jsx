import EmployeeList from "./pages/MainPage";
import EmployeeDetail from "./pages/EmployeeDetailPage";
import EmployeeUpdate from "./pages/EmployeeUpdatePage";
import Login from "./pages/pages/Login";
import Permission from "./pages/pages/PermissionPage";
import EmployeePermissions from "./pages/PermissionListPage";
import SignIn from "./pages/authentication/sign-in";
import DefaultDashboardLayout from "./layouts/DefaultDashboardLayout";
import { ProfilePictureProvider } from "./components/ProfilePictureContext";
import { Routes, Route, Router } from "react-router-dom";
import "./styles/theme.scss";

export default function App() {
  return (
    <>
      <main>
        <ProfilePictureProvider>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route
              path="/emp"
              element={
                <DefaultDashboardLayout>
                  {" "}
                  {<EmployeeList />}
                </DefaultDashboardLayout>
              }
            />
            <Route
              path="/emp-detail"
              element={
                <DefaultDashboardLayout>
                  {" "}
                  {<EmployeeDetail />}
                </DefaultDashboardLayout>
              }
            />
            <Route
              path="/emp-update"
              element={
                <DefaultDashboardLayout>
                  {" "}
                  {<EmployeeUpdate />}
                </DefaultDashboardLayout>
              }
            />
            <Route
              path="/emp-permission"
              element={
                <DefaultDashboardLayout>
                  {" "}
                  {<Permission />}
                </DefaultDashboardLayout>
              }
            />
            <Route
              path="/emp-permission-list"
              element={
                <DefaultDashboardLayout>
                  {" "}
                  {<EmployeePermissions />}
                </DefaultDashboardLayout>
              }
            />
          </Routes>
        </ProfilePictureProvider>
      </main>
    </>
  );
}
