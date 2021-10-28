import axios from "axios";
import { UserInterface } from './../../interface/interface';


export const fetchUsers = async () => {
  const data = await axios.get<UserInterface[]>("http://localhost:3001/users");
  return data;
};
