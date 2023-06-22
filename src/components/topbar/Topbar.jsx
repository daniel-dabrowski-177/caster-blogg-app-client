import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useLocation } from "react-router-dom";
import topbar from "../topbar/topbar.module.css";
import logo from "../../images/logo.svg";

export default function Topbar(
  background,
  color,
  borderLeft,
  borderBottom,
  banner
) {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const styles = {
    navBg: background,
    li: color,
    barBg: background,
  };

  const html = document.querySelector("html");
  const location = useLocation();
  const { pathname } = location;

  if (pathname === "/") {
    html.style.background = "#2F2B3C";
  } else if (pathname === "/about") {
    html.style.background = "#440A06";
  } else if (pathname === "/write") {
    html.style.background = "#031E16";
  } else if (pathname === "/login") {
    html.style.background = "#102C38";
  } else if (pathname === "/register") {
    html.style.background = "#2E112D";
  }

  return (
    <div className={topbar.topbar}>
      <input type="checkbox" id={topbar.menuToggle}></input>
      <label for={topbar.menuToggle} className={topbar.menuToggle}>
        <div className={topbar.menu} style={styles.navBg}>
          <div className={topbar.bar} style={styles.navBg}></div>
          <div className={topbar.bar} style={styles.navBg}></div>
          <div className={topbar.bar} style={styles.navBg}></div>
        </div>
      </label>
      <nav className={topbar.nav} style={styles.navBg}>
        <ul className={topbar.primaryNav}>
          <li style={styles.li}>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li style={styles.li}>
            <Link className="link" to="/about">
              About
            </Link>
          </li>
          <li style={styles.li}>
            <Link className="link" to="/write">
              Write
            </Link>
          </li>
          <li style={styles.li}>
            <Link className="link" to="https://caster-porfolio.netlify.app">
              Portfolio
            </Link>
          </li>
        </ul>
        {user ? (
          <ul className={topbar.secondaryNav}>
            <li style={styles.li}>
              <div className={topbar.settings}>
                <img src={logo} alt="" />
              </div>
            </li>
            <li style={styles.li} onClick={handleLogout}>
              Logout
            </li>
          </ul>
        ) : (
          <ul className={topbar.secondaryNav}>
            <li style={styles.li}>
              <Link className="link" to="/login">
                Login
              </Link>
            </li>
            <li style={styles.li}>
              <Link className="link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}
