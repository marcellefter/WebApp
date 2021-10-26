import React from "react";
import { PostInterface } from "../../interface/interface";
import classes from './Post.module.css';

const Post: React.FC<{ post: PostInterface }> = (props) => {
  console.log(props.post);

  return (
    <li key={props.post.id} className={classes.post}>
      <span className={classes.author}>{props.post.author}</span>
      <p className={classes.text}>{props.post.text}</p>
    </li>
  );
};

export default Post;
