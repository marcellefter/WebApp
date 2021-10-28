import axios from "axios";

export const fetchPosts = async () => {
  const { data } = await axios.get("http://localhost:3001/posts");
  return data;
};

export const deletePost = async (id: string) => {
  return axios.delete(`http://localhost:3001/posts/${id}`);
};
