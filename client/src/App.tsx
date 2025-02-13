import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import { DashboardLayout } from "@/components/DashboardLayout";
import Layout from "@/components/layout";
import { AdminLayout } from "@/components/admin/layout";
import AuthPage from "@/pages/auth-page";
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
import ContactPage from "@/pages/contact";
import FAQPage from "@/pages/faq";
import ConsultancyServicePage from "@/pages/consultancyservice";
import HolidayClassesPage from "@/pages/holidayclasses";
import MockExamPage from "@/pages/mockexam";
import StorePage from "./pages/store";
import TraffordPage from "@/pages/trafford";
import TutionPage from "@/pages/tution";
import AdminDashboard from "@/pages/admin/dashboard";
import TeacherDashboard from "@/pages/teacher/dashboard";
import StudentDashboard from "@/pages/student/dashboard";
import ProfileSettings from "@/pages/profile/settings";
import NotFoundPage from "@/pages/notfound";
import { UserRole } from "@shared/schema";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import UsersPage from "@/pages/admin/users";
import QuestionsPage from "@/pages/admin/questions";
import MediaPage from "@/pages/admin/media";
import ClassesPage from "@/pages/admin/classes";
import StorePageAdmin from "@/pages/admin/store";
import SubscriptionsPage from "@/pages/admin/subscriptions";
import ExamsPage from "@/pages/admin/exams";
import AssignmentsPage from "@/pages/admin/assignments";
import AdminProfilePage from "@/pages/admin/profile";
import OrderHistory from "@/pages/profile/orders";
import CartPage from "@/pages/cart";

function AdminRoute({
  component: Component,
}: {
  component: () => React.JSX.Element;
}) {
  return (
    <AdminLayout>
      <Component />
    </AdminLayout>
  );
}

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/">
        <Layout>
          <HomePage />
        </Layout>
      </Route>
      <Route path="/auth" component={AuthPage} />
      <Route path="/about">
        <Layout>
          <AboutPage />
        </Layout>
      </Route>
      <Route path="/contact">
        <Layout>
          <ContactPage />
        </Layout>
      </Route>
      <Route path="/faq">
        <Layout>
          <FAQPage />
        </Layout>
      </Route>
      <Route path="/consultancy">
        <Layout>
          <ConsultancyServicePage />
        </Layout>
      </Route>
      <Route path="/holidayclasses">
        <Layout>
          <HolidayClassesPage />
        </Layout>
      </Route>
      <Route path="/mockexam">
        <Layout>
          <MockExamPage />
        </Layout>
      </Route>
      <Route path="/store">
        <Layout>
          <StorePage />
        </Layout>
      </Route>
      <Route path="/cart">
        <Layout>
          <CartPage />
        </Layout>
      </Route>
      <Route path="/trafford">
        <Layout>
          <TraffordPage />
        </Layout>
      </Route>
      <Route path="/tution">
        <Layout>
          <TutionPage />
        </Layout>
      </Route>

      {/* Admin routes */}
      <ProtectedRoute
        path="/admin/dashboard"
        component={() => <AdminRoute component={AdminDashboard} />}
        roles={[UserRole.ADMIN]}
      />
      <ProtectedRoute
        path="/admin/users"
        component={() => <AdminRoute component={UsersPage} />}
        roles={[UserRole.ADMIN]}
      />
      <ProtectedRoute
        path="/admin/questions"
        component={() => <AdminRoute component={QuestionsPage} />}
        roles={[UserRole.ADMIN]}
      />
      <ProtectedRoute
        path="/admin/media"
        component={() => <AdminRoute component={MediaPage} />}
        roles={[UserRole.ADMIN]}
      />
      <ProtectedRoute
        path="/admin/classes"
        component={() => <AdminRoute component={ClassesPage} />}
        roles={[UserRole.ADMIN]}
      />
      <ProtectedRoute
        path="/admin/store"
        component={() => <AdminRoute component={StorePageAdmin} />}
        roles={[UserRole.ADMIN]}
      />
      <ProtectedRoute
        path="/admin/subscriptions"
        component={() => <AdminRoute component={SubscriptionsPage} />}
        roles={[UserRole.ADMIN]}
      />
      <ProtectedRoute
        path="/admin/exams"
        component={() => <AdminRoute component={ExamsPage} />}
        roles={[UserRole.ADMIN]}
      />
      <ProtectedRoute
        path="/admin/assignments"
        component={() => <AdminRoute component={AssignmentsPage} />}
        roles={[UserRole.ADMIN]}
      />
      <ProtectedRoute
        path="/admin/profile"
        component={() => <AdminRoute component={AdminProfilePage} />}
        roles={[UserRole.ADMIN]}
      />

      {/* Protected routes */}
      <ProtectedRoute
        path="/teacher/dashboard"
        component={() => (
          <DashboardLayout>
            <TeacherDashboard />
          </DashboardLayout>
        )}
        roles={[UserRole.TEACHER]}
      />
      <ProtectedRoute
        path="/student/dashboard"
        component={() => (
          <DashboardLayout>
            <StudentDashboard />
          </DashboardLayout>
        )}
        roles={[UserRole.STUDENT]}
      />
      <ProtectedRoute
        path="/profile"
        component={() => (
          <DashboardLayout>
            <ProfileSettings />
          </DashboardLayout>
        )}
      />
      <ProtectedRoute
        path="/profile/orders"
        component={() => (
          <DashboardLayout>
            <OrderHistory />
          </DashboardLayout>
        )}
      />

      {/* 404 route */}
      <Route>
        <Layout>
          <NotFoundPage />
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
