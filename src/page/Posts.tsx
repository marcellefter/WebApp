import { PostInterface } from "../interface/interface";
import Post from "../componests/Post/Post";
import classes from "./Posts.module.css";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchPosts } from "./../api/posts/posts";
import { AxiosError } from "axios";

const Posts = () => {
  const { data, isLoading, isError, error } = useQuery<
    unknown,
    AxiosError,
    PostInterface[]
  >("posts", fetchPosts);
  console.log(error);

  // const queryClient = useQueryClient();\
  
  // const { mutate } = useMutation(fetchPosts, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("posts");
  //   },
  // });

  // const handleForm = (values: any) => {
  //   const formatedValues = {
  //     ...values,
  //     date: new Date(),
  //   };
  //   mutate(formatedValues);
  // };

  return (
    <>
      <ul className={classes.posts}>
        {isError && <p>{error}</p>}
        {isLoading && <p>Information is loading...</p>}
        {data?.map((item: PostInterface) => (
          <Post post={item} />
        ))}
      </ul>
      <Link to="/edit-post/" className={classes.button}>
        Adauga un post
      </Link>
    </>
  );
};

export default Posts;
