import { PostInterface } from "../interface/interface";
import Post from "../componests/Post/Post";
import classes from "./Posts.module.css";
import { useQuery } from "react-query";

const fetchUsers = async () => {
  const res = await fetch("http://localhost:3001/posts");
  return res.json();
};

const Posts = () => {
  const response = useQuery("users", fetchUsers);

  return (
    <ul className={classes.posts}>
      {response.status === "error" && <p>Server error</p>}
      {response.status === "loading" && <p>Information is loading...</p>}
      {response.status === "success" &&
        response.data.map((item: PostInterface) => <Post post={item} />)}
    </ul>
  );
};

export default Posts;
