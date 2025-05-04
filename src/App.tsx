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

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.CHATBOT} element={<ChatBot />} />
          <Route path={ROUTES.RESOURCES} element={<Resources />} />
          <Route path={ROUTES.MAP} element={<Map />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
