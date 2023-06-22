import PostStyles from "../post/post.module.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className={PostStyles.post}>
      <div className={PostStyles.postImg}>
        {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      </div>
      <div className={PostStyles.contentWrapper}>
        <div className={PostStyles.userWrapper}>
          <div className={PostStyles.postUser}>
            <i>{post.username}</i>
          </div>
          <div className={PostStyles.postData}>
            <i>{new Date(post.createdAt).toDateString()}</i>
          </div>
        </div>
        <Link className="link" to={`/post/${post._id}`}>
          <div className={PostStyles.postTitle}>{post.title}</div>
        </Link>
        <div className={PostStyles.postDesc}>{post.desc}</div>
      </div>
    </div>
  );
}
