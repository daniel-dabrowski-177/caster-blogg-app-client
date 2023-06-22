import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import header from "../header/header.module.css";

export default function Header() {
  return (
    <div className={header.header}>
      <div className={header.logoBg}>
        <img src={logo} alt="" />
      </div>
      <span className={header.desc}>Welcome to .CasterBlogApp</span>
      <div className={header.wrapper}>
        <span className={header.recent}>Recent posts:</span>
        <button className={header.createBtn}>
          <Link className="link" to="/write">
            Create a post +
          </Link>
        </button>
      </div>
    </div>
  );
}
