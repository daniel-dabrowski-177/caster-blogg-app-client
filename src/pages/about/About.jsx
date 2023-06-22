import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import AboutStyles from "../about/about.module.css";
import logoReact from "../../images/logo-react.png";
import logoStyled from "../../images/logo-sc.png";
import logoMongo from "../../images/logo-mongo.png";
import logoMaterials from "../../images/logo-mu.png";
import iconEmail from "../../images/icon-email.svg";
import iconLinkedIn from "../../images/icon-linkedin.svg";

export default function Home() {
  const axiosInstance = axios.create({
    baseURL: "https://caster-blog-app.onrender.com/api/",
  });
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Topbar
        background="#440A06"
        color="#DC6542"
        borderBottom="4px solid #DC6542"
      />
      <div className={AboutStyles.about}>
        <div className={AboutStyles.container}>
          <div className={AboutStyles.postWrapper}>
            <h2 className={AboutStyles.title}>ABOUT</h2>
            <p className={AboutStyles.desc}>
              Welcome to FullStack .CasterBlogApp! This is an application
              created with React library and Styled-components.
            </p>
            <p className={AboutStyles.desc}>
              This is an application created with React library and
              Styled-components. Backend has been created with MongoDB.
            </p>
            <p className={AboutStyles.desc}>Feel free to test it out :)</p>
            <p className={AboutStyles.desc}>
              The app contains a register and login system.
            </p>
            <p className={AboutStyles.desc}>
              After log in, you can visit all posts and edit your own. You can
              also create a new one - add a photo, title and description.
            </p>
          </div>
          <div className={AboutStyles.postWrapper}>
            <div className={AboutStyles.icons}>
              <img src={logoReact} alt="" />
              <img src={logoStyled} alt="" />
              <img src={logoMongo} alt="" />
              <img src={logoMaterials} alt="" />
            </div>
            <h2 className={AboutStyles.title}>CONTACT</h2>
            <div className={AboutStyles.contactContainer}>
              <div className={AboutStyles.contactWrapper}>
                <img src={iconEmail} alt="" />
                <p className={AboutStyles.contactDesc}>
                  daniel.dabrowski.177@gmail.com
                </p>
              </div>
              <div className={AboutStyles.contactWrapper}>
                <img src={iconLinkedIn} alt="" />
                <p className={AboutStyles.contactDesc}>
                  https://www.linkedin.com/in/daniel-dąbrowski-1812b41b4/
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
