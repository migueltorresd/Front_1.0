import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { ROUTES } from "@/lib/routes";
import Resources from "@/pages/Resources";
import Map from "@/pages/Map";
import About from "@/pages/About";
import ChatBot from "@/pages/ChatBot";
import Login from "@/pages/Login";
import Appointment from "@/pages/Appointment";
import Profile from "@/pages/Profile";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import PublicOnlyRoute from "@/components/shared/PublicOnlyRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <main>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.CHATBOT} element={<ChatBot />} />
            <Route path={ROUTES.RESOURCES} element={<Resources />} />
            <Route path={ROUTES.MAP} element={<Map />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route
              path={ROUTES.APPOINTMENTS}
              element={
                <ProtectedRoute>
                  <Appointment />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.LOGIN}
              element={
                <PublicOnlyRoute>
                  <Login />
                </PublicOnlyRoute>
              }
            />
            <Route
              path={ROUTES.PROFILE}
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
