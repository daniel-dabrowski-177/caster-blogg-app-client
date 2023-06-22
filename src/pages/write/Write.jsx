import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import WriteStyles from "../write/write.module.css";
import Topbar from "../../components/topbar/Topbar";
import iconAddImage from "../../images/icon-add-image.svg";

export default function Write() {
  const axiosInstance = axios.create({
    baseURL: "caster-blog-app.onrender.com/api/",
  });
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axiosInstance.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  return (
    <>
      <Topbar
        background="#031E16"
        color="#BDF1E4"
        borderBottom="4px solid #BDF1E4"
      />
      <div className={WriteStyles.write}>
        <form className={WriteStyles.writeForm} onSubmit={handleSubmit}>
          <h2 className={WriteStyles.header}>WRITE</h2>
          {file && (
            <div className={WriteStyles.imgBg}>
              <img
                className={WriteStyles.writeImg}
                src={URL.createObjectURL(file)}
                alt=""
              />
            </div>
          )}
          <div className={WriteStyles.container}>
            <label htmlFor="fileInput">
              <img src={iconAddImage} alt="" />
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              className={WriteStyles.writeInput}
              type="text"
              placeholder="enter a title.."
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={WriteStyles.container}>
            <textarea
              placeholder="enter a description.."
              type="text"
              className={WriteStyles.writeText}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <button className={WriteStyles.button} type="submit">
              Publish
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
