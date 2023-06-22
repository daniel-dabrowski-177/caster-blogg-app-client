import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import HomeStyles from "../home/home.module.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";

export default function Home() {
  const axiosInstance = axios.create({
    baseURL: "https://caster-blog-app.onrender.com",
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
        background="#2f2b3c"
        color="#ffc5c4"
        borderBottom="4px solid #ffc5c4"
      />
      <Header />
      <div className={HomeStyles.home}></div>
      <Posts posts={posts} />
    </>
  );
}
