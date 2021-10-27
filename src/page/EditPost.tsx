import axios from "axios";
import React, { useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { PostInterface } from "../interface/interface";
import classes from "./EditPost.module.css";

const EditPost = () => {
  const history = useHistory();
  const nameRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [post, setPost] = useState<PostInterface | null>(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  console.log(id);

  axios
    .get<PostInterface>(`http://localhost:3001/posts/${id}`)
    .then((res) => setPost(res.data))
    .catch((error) => console.log(error));

  const editPostHandler = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id === 'null') {
      console.log("id = null");
      axios
        .post(`http://localhost:3001/posts`, {
          author: localStorage.getItem('user'),
          text: textRef.current?.value,
        })
        .then((res) => console.log(res.data))
        .catch((error) => console.log(error));
    }

    axios
      .patch(`http://localhost:3001/posts/${id}`, {
        author: nameRef.current?.value,
        text: textRef.current?.value,
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));

    history.push("/posts");
  };

  return (
    <div className={classes.wrapper}>
      <span className={classes.title}>{localStorage.getItem("user")}</span>
      <form
        onSubmit={(event) => editPostHandler(event)}
        className={classes.form}
      >
        {id !== "null" && (
          <input
            ref={nameRef}
            className={classes.input}
            defaultValue={post?.author}
          />
        )}
        <textarea
          ref={textRef}
          className={classes.textarea}
          defaultValue={post?.text}
        ></textarea>
        <button className={classes.button}>Submit</button>
      </form>
    </div>
  );
};

export default EditPost;
