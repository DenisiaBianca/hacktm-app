import "./App.css";
import Login from "./components/login/login";
import MobileHeader from "./components/header/mobile-menu";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AdminHome from "./components/adminHome/adminHome";
import UserHome from "./components/userHome/userHome";
import { parseJwt, getToken } from "./hooks/hook";

function App() {
  const isAdmin = parseJwt(getToken())?.role == "ADMIN" ? true : false;
  const isUser = parseJwt(getToken())?.role == "USER" ? true : false;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MobileHeader />}>
            <Route path="login" element={<Login />} />
            <Route path="home" element={isUser ? <UserHome /> : <Login />} />
            <Route path="/" element={<Login />} />
            <Route path="all" element={isAdmin ? <AdminHome /> : <Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
