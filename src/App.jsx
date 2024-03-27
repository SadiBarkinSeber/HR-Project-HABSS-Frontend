import { DashboardMenu } from "../routes/DashboardRoutes";
import { DashboardMenuManager } from "../routes/DashboardRoutesManager";
import EmployeeList from "./pages/EmployeeMainPage";
import EmployeeDetail from "./pages/EmployeeDetailPage";
import EmployeeUpdate from "./pages/EmployeeUpdatePage";
import Permission from "./pages/pages/PermissionPage";
import EmployeePermissions from "./pages/PermissionListPage";
import SignIn from "./pages/authentication/sign-in";
import ResetPassword from "./pages/authentication/reset-password";
import DefaultDashboardLayout from "./layouts/DefaultDashboardLayout";
import { ProfilePictureProvider } from "./components/ProfilePictureContext";
import { Routes, Route, Router } from "react-router-dom";
import "./styles/theme.scss";
import AdvanceList from "./pages/pages/AdvanceList";
import Advance from "./pages/pages/AdvancePage";
import Expense from "./pages/pages/ExpensePage";
import ExpenseList from "./pages/ExpenseList";
import ManagerPermissionList from "./pages/pages/ManagerPermissionList";
import ManagerAdvanceList from "./pages/pages/ManagerAdvanceList";
import ManagerExpenseList from "./pages/pages/ManagerExpenseList";
import ManagerDetail from "./pages/pages/ManagerDetailPage";
import ManagerList from "./pages/pages/ManagerMain";
import ManagerUpdate from "./pages/pages/ManagerUpdate";
import { AuthProvider } from "./components/TokenContext";

import EmployeeCreate from "./pages/pages/EmployeeCreate";

import ForgetPassword from "./pages/authentication/forget-password";
import ManagerEmployeeList from "./pages/pages/ManagerEmployeeList";
export default function App() {
  return (
    <>
      <main>
        <AuthProvider>
          <ProfilePictureProvider>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/forgetpassword" element={<ForgetPassword />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
              <Route
                path="/emp"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenu}>
                    {" "}
                    {<EmployeeList />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/emp-detail"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenu}>
                    {" "}
                    {<EmployeeDetail />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/emp-update"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenu}>
                    {" "}
                    {<EmployeeUpdate />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/emp-permission"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenu}>
                    {" "}
                    {<Permission />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/emp-permission-list"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenu}>
                    {" "}
                    {<EmployeePermissions />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/emp-advance"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenu}>
                    {" "}
                    {<Advance />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/emp-advance-list"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenu}>
                    {" "}
                    {<AdvanceList />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/emp-expense"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenu}>
                    {" "}
                    {<Expense />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/emp-expense-list"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenu}>
                    {" "}
                    {<ExpenseList />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/mng"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenuManager}>
                    {" "}
                    {<ManagerList />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/mng-detail"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenuManager}>
                    {" "}
                    {<ManagerDetail />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/mng-update"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenuManager}>
                    {" "}
                    {<ManagerUpdate />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/mng-employee-create"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenuManager}>
                    {" "}
                    {<EmployeeCreate />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/mng-permission-list"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenuManager}>
                    {" "}
                    {<ManagerPermissionList />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/mng-advance-list"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenuManager}>
                    {" "}
                    {<ManagerAdvanceList />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/mng-expense-list"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenuManager}>
                    {" "}
                    {<ManagerExpenseList />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/mng-employee-list"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenuManager}>
                    {" "}
                    {<ManagerEmployeeList />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/admin"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenuManager}>
                    {" "}
                    {<ManagerList />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/admin-detail"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenuManager}>
                    {" "}
                    {<ManagerDetail />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/admin-update"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenuManager}>
                    {" "}
                    {<ManagerUpdate />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/admin-company-create"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenuManager}>
                    {" "}
                    {<EmployeeCreate />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/admin-company-list"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenuManager}>
                    {" "}
                    {<ManagerPermissionList />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/admin-manager-create"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenuManager}>
                    {" "}
                    {<EmployeeCreate />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/admin-manager-list"
                element={
                  <DefaultDashboardLayout routeType={DashboardMenuManager}>
                    {" "}
                    {<ManagerPermissionList />}
                  </DefaultDashboardLayout>
                }
              />
            </Routes>
          </ProfilePictureProvider>
        </AuthProvider>
      </main>
    </>
  );
}
