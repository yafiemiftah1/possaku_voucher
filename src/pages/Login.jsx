
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../LoginSimple.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const res = await axios.post(
        "https://possaku.store/dev/core/loginAdmin",
        { username, password }
        );

        if (res.data && res.data.success === true) {

        const ussd = res.data.token.ussd;
        const token = res.data.token.token;

        // simpan ke sessionStorage
        sessionStorage.setItem("ussd", ussd);
        sessionStorage.setItem("token", token);

        navigate("/voucher");

        } else {
        setMessage("Login gagal");
        }

    } catch (err) {
        setMessage("Terjadi kesalahan login");
        console.error(err);
    }
  };


  return (
    <>
      <Helmet>
        <title>Login - Possaku Redeem Voucher</title>
        <meta name="description" content="Halaman login admin untuk Possaku Redeem Voucher." />
      </Helmet>
      <div className="login-bg">
        <div className="login-container">
          <div className="login-title">Login Admin</div>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          <div className="login-message">{message}</div>
        </div>
      </div>
    </>
  );
}
