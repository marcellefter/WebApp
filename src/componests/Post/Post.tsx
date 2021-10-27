import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { PostInterface } from "../../interface/interface";
import classes from "./Post.module.css";

const Post: React.FC<{ post: PostInterface }> = (props) => {
  const history = useHistory();
  const deletePostHandler = () => {
    axios
      .delete(`http://localhost:3001/posts/${props.post.id}`)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));

    history.go(0);
  };

  return (
    <li key={props.post.id} className={classes.post}>
      <span className={classes.author}>{props.post.author}</span>
      <p className={classes.text}>{props.post.text}</p>
      {localStorage.getItem("isAdmin") === "true" && (
        <div className={classes.group}>
          <Link className={classes.link} to={`edit-post/?id=${props.post.id}`}>
            Edit
          </Link>
          <button onClick={deletePostHandler} className={classes.link}>
            Delete
          </button>
        </div>
      )}
    </li>
  );
};

export default Post;
