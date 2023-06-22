import RegisterStyles from "../register/register.module.css";
import { useState } from "react";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";

export default function Register() {
  const axiosInstance = axios.create({
    baseURL: "https://caster-blog-app.onrender.com/api/",
  });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Topbar
        background="#2E112D"
        color="#DC6542"
        borderBottom="4px solid #DC6542"
      />
      <div className={RegisterStyles.register}>
        <form className={RegisterStyles.registerForm} onSubmit={handleSubmit}>
          <span className={RegisterStyles.registerTitle}>REGISTER</span>
          <label className={RegisterStyles.label}>Username:</label>
          <input
            type="text"
            className={RegisterStyles.registerInput}
            placeholder="enter username..."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label className={RegisterStyles.label}>Email:</label>
          <input
            type="text"
            className={RegisterStyles.registerInput}
            placeholder="enter email address..."
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label className={RegisterStyles.label}>Password:</label>
          <input
            type="password"
            className={RegisterStyles.registerInput}
            placeholder="enter password..."
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className={RegisterStyles.button} type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
