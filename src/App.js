import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import LinkSteam from "./Pages/LinkSteam";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/link-steam" element={<LinkSteam />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
