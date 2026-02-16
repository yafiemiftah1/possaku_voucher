
export default function Voucher() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const ussd = sessionStorage.getItem("ussd");

  useEffect(() => {
    if (!token || !ussd) {
      navigate("/");
    }
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!/^628\d{8,13}$/.test(phone)) {
      setMessage("Format nomor salah (gunakan 628xxxx)");
      return;
    }
    try {
      const res = await axios.get(
        `https://possaku.store/dev/notification/generateVoucherWA/${phone}`,
        {
          params: {
            campaign_id: "6980bb6f09dddd5c41b8cdff",
          },
          headers: {
            ussd: sessionStorage.getItem("ussd"),
            token: sessionStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setMessage(res.data.message);
      } else {
        setMessage("Gagal kirim voucher");
      }
    } catch (err) {
      setMessage("Error mengirim voucher");
      console.error(err);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="voucher-split-bg">
      <div className="voucher-split-container">
        <div className="voucher-split-left">
          <div className="voucher-split-title">Ayo Daftar Sekarang Juga!</div>
          <form onSubmit={handleSend} className="voucher-split-form">
            <label className="voucher-split-label" htmlFor="phone">Nomor Handphone <span style={{color:'#e53935'}}>*</span></label>
            <input
              id="phone"
              type="tel"
              placeholder="Contoh: 6281XXXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button type="submit">Kirim Voucher</button>
          </form>
          <div className="voucher-split-message">{message}</div>
          <button className="voucher-logout" onClick={handleLogout} style={{marginTop:'1rem'}}>Logout</button>
        </div>
        <div className="voucher-split-right">
          <img src={promoImg} alt="Promo" className="voucher-split-img" />
        </div>
      </div>
    </div>
  );
}
// ...existing code...
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../VoucherSplit.css";
import promoImg from "../assets/voucherPromoImg";
