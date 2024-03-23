import EmployeeList from "./pages/MainPage";
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
import { AuthProvider } from "./components/TokenContext";

import EmployeeCreate from "./pages/pages/EmployeeCreate";

import ForgetPassword from "./pages/authentication/forget-password";

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
                path="/emp-expense"
                element={
                  <DefaultDashboardLayout>
                    {" "}
                    {<Expense />}
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
              <Route
                path="/emp-employee-create"
                element={
                  <DefaultDashboardLayout>
                    {" "}
                    {<EmployeeCreate />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/mng-permission-list"
                element={
                  <DefaultDashboardLayout>
                    {" "}
                    {<ManagerPermissionList />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/mng-advance-list"
                element={
                  <DefaultDashboardLayout>
                    {" "}
                    {<ManagerAdvanceList />}
                  </DefaultDashboardLayout>
                }
              />
              <Route
                path="/mng-expense-list"
                element={
                  <DefaultDashboardLayout>
                    {" "}
                    {<ManagerExpenseList />}
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
