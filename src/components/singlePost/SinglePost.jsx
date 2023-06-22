import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import Topbar from "../topbar/Topbar";
import editIcon from "../../images/icon-edit.svg";
import deleteIcon from "../../images/icon-delete.svg";

export default function SinglePost() {
  const axiosInstance = axios.create({
    baseURL: "https://caster-blog-app.onrender.com",
  });
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };

    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <Topbar
        background="#2f2b3c"
        color="#ffc5c4"
        borderBottom="4px solid #ffc5c4"
      />
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        <div className="singlePostInfo">
          <span className="sinlgePostAuthor">
            <Link className="link" to={`/?user=${post.username}`}>
              <i>
                <b>{post.username}</b>
              </i>
            </Link>
          </span>
          <span className="sinlgePostDate">
            <i>
              <b>{new Date(post.createdAt).toDateString()}</b>
            </i>
          </span>
        </div>
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autofocus
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <div className="editImg">
                  <img
                    alt="edit"
                    src={editIcon}
                    onClick={() => {
                      setUpdateMode(true);
                    }}
                  />
                </div>
                <div className="deleteImg">
                  <img alt="delete" src={deleteIcon} onClick={handleDelete} />
                </div>
              </div>
            )}
          </h1>
        )}

        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
