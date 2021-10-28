import axios from "axios";

export const fetchPosts = async () => {
  const { data } = await axios.get("http://localhost:3001/posts");
  return data;
};

export const deletePost = async (id: string) => {
  const { data } = axios.delete(`http://localhost:3001/posts/${id}`);
  return data;
};
