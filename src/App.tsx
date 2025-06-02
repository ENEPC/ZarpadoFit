import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import UploadPhoto from "./pages/UploadPhoto";
import VirtualTryOn from "./pages/VirtualTryOn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<UploadPhoto />} />
        <Route path="/try-on" element={<VirtualTryOn />} />
      </Routes>
    </Router>
  );
}

export default App;
