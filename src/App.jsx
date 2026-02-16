import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Voucher from "./pages/Voucher";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/voucher" element={<Voucher />} />
    </Routes>
  );
}

export default App;
