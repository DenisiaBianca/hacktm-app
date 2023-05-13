import "./App.css";
import Login from "./components/login/login";
import MobileHeader from "./components/header/mobile-menu";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Graphic from "./components/graph/graph";
import Home from "./components/home/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MobileHeader />}>
            <Route path="login" element={<Login />} />
            <Route path="home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
