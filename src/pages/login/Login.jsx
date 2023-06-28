import axios from "axios";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import LoginStyles from "../login/login.module.css";
import Topbar from "../../components/topbar/Topbar";

export default function Login() {
  const axiosInstance = axios.create({
    baseURL: "https://caster-blog-app.onrender.com/api/",
  });
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      window.location = "/";
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <>
      <Topbar
        background="#102C38"
        color="#4E9CB9"
        borderBottom="4px solid #4E9CB9"
      />
      <div className={LoginStyles.login}>
        <form className={LoginStyles.loginForm} onSubmit={handleSubmit}>
          <span className={LoginStyles.loginTitle}>LOGIN</span>
          <label className={LoginStyles.label}>Username:</label>
          <input
            type="text"
            className={LoginStyles.loginInput}
            placeholder="enter username..."
            ref={userRef}
          />
          <label className={LoginStyles.label}>Password:</label>
          <input
            type="password"
            className={LoginStyles.loginInput}
            placeholder="enter password..."
            ref={passwordRef}
          />
          <button
            className={LoginStyles.button}
            type="submit"
            disabled={isFetching}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
