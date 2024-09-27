import "./App.css";
import { Route, Routes } from "react-router-dom";
import "antd/dist/reset.css";
import { Login } from "./components/Login/Login";
import Wrapper from "./Wrapper";

function App() {
  return (
    <Routes>
      <Route element={<Login />} path="/login" />
      <Route element={<Wrapper mode={"greeting"} />} path="/" />
      <Route element={<Wrapper mode={"main"} />} path="/main/:id?" />
      <Route element={<Wrapper mode={"admin"} />} path="/admin" />
    </Routes>
  );
}

export default App;
