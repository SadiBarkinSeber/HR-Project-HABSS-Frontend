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
import AdvanceList from "./pages/pages/Advancelist";
import Advance from "./pages/pages/AdvancePage";
import ExpenseList from "./pages/ExpenseList";

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
             <Route
              path="/emp-advance"
              element={
                <DefaultDashboardLayout>
                  {" "}
                  {<Advance />}
                </DefaultDashboardLayout>
              }
            />
             <Route
              path="/emp-advance-list"
              element={
                <DefaultDashboardLayout>
                  {" "}
                  {<AdvanceList />}
                </DefaultDashboardLayout>
              }
            />
              <Route
              path="/emp-expense-list"
              element={
                <DefaultDashboardLayout>
                  {" "}
                  {<ExpenseList />}
                </DefaultDashboardLayout>
              }
            />
          </Routes>
        </ProfilePictureProvider>
      </main>
    </>
  );
}
