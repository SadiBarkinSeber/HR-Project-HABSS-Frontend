import { DashboardMenu } from "../routes/DashboardRoutes";
import { DashboardMenuManager } from "../routes/DashboardRoutesManager";
import DashboardMenuAdmin from "../routes/DashboardRoutesAdmin";
import { useAuth } from "./components/TokenContext";
import EmployeeList from "./pages/EmployeeMainPage";
import EmployeeDetail from "./pages/EmployeeDetailPage";
import EmployeeUpdate from "./pages/EmployeeUpdatePage";
import Permission from "./pages/pages/PermissionPage";
import EmployeePermissions from "./pages/PermissionListPage";
import SignIn from "./pages/authentication/sign-in";
import ResetPassword from "./pages/authentication/reset-password";
import DefaultDashboardLayout from "./layouts/DefaultDashboardLayout";
import { ProfilePictureProvider } from "./components/ProfilePictureContext";
import { Routes, Route, Router, Navigate } from "react-router-dom";
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
import { EmployeeDataProvider } from "./components/EmployeeContext";
import EmployeeCreate from "./pages/pages/EmployeeCreate";
import { jwtDecode } from "jwt-decode";

import ForgetPassword from "./pages/authentication/forget-password";
import ManagerEmployeeList from "./pages/pages/ManagerEmployeeList";
import { ManagerDataProvider } from "./components/ManagerContext";

const ProtectedRoute = ({ element, roles, ...rest }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const decodedToken = jwtDecode(token);

  if (!roles || !decodedToken.role) {
    // Roller belirtilmemiş veya kullanıcının rolü belirtilmemişse ana sayfaya yönlendir
    return <Navigate to="/" replace />;
  }

  if (roles.some((role) => role === decodedToken.role)) {
    return element;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default function App() {
  return (
    <>
      <main>
        <AuthProvider>
          <ManagerDataProvider>
            <EmployeeDataProvider>
              <ProfilePictureProvider>
                <Routes>
                  <Route path="/" element={<SignIn />} />
                  <Route path="/forgetpassword" element={<ForgetPassword />} />
                  <Route path="/resetpassword" element={<ResetPassword />} />
                  <Route
                    path="/emp"
                    element={
                      <ProtectedRoute
                        roles={["employee"]}
                        element={
                          <DefaultDashboardLayout routeType={DashboardMenu}>
                            {" "}
                            {<EmployeeList />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/emp-detail"
                    element={
                      <ProtectedRoute
                        roles={["employee"]}
                        element={
                          <DefaultDashboardLayout routeType={DashboardMenu}>
                            {" "}
                            {<EmployeeDetail />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/emp-update"
                    element={
                      <ProtectedRoute
                        roles={["employee"]}
                        element={
                          <DefaultDashboardLayout routeType={DashboardMenu}>
                            {" "}
                            {<EmployeeUpdate />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/emp-permission"
                    element={
                      <ProtectedRoute
                        roles={["employee"]}
                        element={
                          <DefaultDashboardLayout routeType={DashboardMenu}>
                            {" "}
                            {<Permission />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/emp-permission-list"
                    element={
                      <ProtectedRoute
                        roles={["employee"]}
                        element={
                          <DefaultDashboardLayout routeType={DashboardMenu}>
                            {" "}
                            {<EmployeePermissions />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/emp-advance"
                    element={
                      <ProtectedRoute
                        roles={["employee"]}
                        element={
                          <DefaultDashboardLayout routeType={DashboardMenu}>
                            {" "}
                            {<Advance />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/emp-advance-list"
                    element={
                      <ProtectedRoute
                        roles={["employee"]}
                        element={
                          <DefaultDashboardLayout routeType={DashboardMenu}>
                            {" "}
                            {<AdvanceList />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/emp-expense"
                    element={
                      <ProtectedRoute
                        roles={["employee"]}
                        element={
                          <DefaultDashboardLayout routeType={DashboardMenu}>
                            {" "}
                            {<Expense />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/emp-expense-list"
                    element={
                      <ProtectedRoute
                        roles={["employee"]}
                        element={
                          <DefaultDashboardLayout routeType={DashboardMenu}>
                            {" "}
                            {<ExpenseList />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/mng"
                    element={
                      <ProtectedRoute
                        roles={["manager"]}
                        element={
                          <DefaultDashboardLayout
                            routeType={DashboardMenuManager}
                          >
                            {" "}
                            {<ManagerList />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/mng-detail"
                    element={
                      <ProtectedRoute
                        roles={["manager"]}
                        element={
                          <DefaultDashboardLayout
                            routeType={DashboardMenuManager}
                          >
                            {" "}
                            {<ManagerDetail />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/mng-update"
                    element={
                      <ProtectedRoute
                        roles={["manager"]}
                        element={
                          <DefaultDashboardLayout
                            routeType={DashboardMenuManager}
                          >
                            {" "}
                            {<ManagerUpdate />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/mng-employee-create"
                    element={
                      <ProtectedRoute
                        roles={["manager"]}
                        element={
                          <DefaultDashboardLayout
                            routeType={DashboardMenuManager}
                          >
                            {" "}
                            {<EmployeeCreate />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/mng-permission-list"
                    element={
                      <ProtectedRoute
                        roles={["manager"]}
                        element={
                          <DefaultDashboardLayout
                            routeType={DashboardMenuManager}
                          >
                            {" "}
                            {<ManagerPermissionList />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/mng-advance-list"
                    element={
                      <ProtectedRoute
                        roles={["manager"]}
                        element={
                          <DefaultDashboardLayout
                            routeType={DashboardMenuManager}
                          >
                            {" "}
                            {<ManagerAdvanceList />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/mng-expense-list"
                    element={
                      <ProtectedRoute
                        roles={["manager"]}
                        element={
                          <DefaultDashboardLayout
                            routeType={DashboardMenuManager}
                          >
                            {" "}
                            {<ManagerExpenseList />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/mng-employee-list"
                    element={
                      <ProtectedRoute
                        roles={["manager"]}
                        element={
                          <DefaultDashboardLayout
                            routeType={DashboardMenuManager}
                          >
                            {" "}
                            {<ManagerEmployeeList />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute
                        roles={["siteManager"]}
                        element={
                          <DefaultDashboardLayout
                            routeType={DashboardMenuAdmin}
                          >
                            {" "}
                            {<EmployeeList />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/admin-detail"
                    element={
                      <ProtectedRoute
                        roles={["siteManager"]}
                        element={
                          <DefaultDashboardLayout
                            routeType={DashboardMenuAdmin}
                          >
                            {" "}
                            {<ManagerDetail />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/admin-update"
                    element={
                      <ProtectedRoute
                        roles={["siteManager"]}
                        element={
                          <DefaultDashboardLayout
                            routeType={DashboardMenuAdmin}
                          >
                            {" "}
                            {<ManagerUpdate />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/admin-company-create"
                    element={
                      <ProtectedRoute
                        roles={["siteManager"]}
                        element={
                          <DefaultDashboardLayout
                            routeType={DashboardMenuAdmin}
                          >
                            {" "}
                            {<EmployeeCreate />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/admin-company-list"
                    element={
                      <ProtectedRoute
                        roles={["siteManager"]}
                        element={
                          <DefaultDashboardLayout
                            routeType={DashboardMenuAdmin}
                          >
                            {" "}
                            {<ManagerPermissionList />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/admin-manager-create"
                    element={
                      <ProtectedRoute
                        roles={["siteManager"]}
                        element={
                          <DefaultDashboardLayout
                            routeType={DashboardMenuAdmin}
                          >
                            {" "}
                            {<EmployeeCreate />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                  <Route
                    path="/admin-manager-list"
                    element={
                      <ProtectedRoute
                        roles={["siteManager"]}
                        element={
                          <DefaultDashboardLayout
                            routeType={DashboardMenuAdmin}
                          >
                            {" "}
                            {<ManagerPermissionList />}
                          </DefaultDashboardLayout>
                        }
                      />
                    }
                  />
                </Routes>
              </ProfilePictureProvider>
            </EmployeeDataProvider>
          </ManagerDataProvider>
        </AuthProvider>
      </main>
    </>
  );
}
