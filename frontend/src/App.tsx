import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";

import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminPhotos from "./pages/admin/AdminPhotos";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminAbout from "./pages/admin/AdminAbout";
import AdminPricing from "./pages/admin/AdminPricing";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/photos" element={<AdminPhotos />} />
          <Route path="/admin/about" element={<AdminAbout />} />
          <Route path="/admin/pricing" element={<AdminPricing />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;