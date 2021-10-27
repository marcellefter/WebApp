import { UserInterface } from "../interface/interface";
import User from "../componests/User/User";
import classes from "./Users.module.css";
import { useQuery } from "react-query";

const fetchUsers = async () => {
  const res = await fetch("http://localhost:3001/users");
  return res.json();
};

const Users = () => {
  const response = useQuery("users", fetchUsers);

  return (
    <>
      <ul className={classes.users}>
        {response.isError && <p>Response error</p>}
        {response.isLoading && <p>Information is loading...</p>}
        {response.status === "success" &&
          response.data.map((item: UserInterface) => <User user={item} />)}
      </ul>
    </>
  );
};

export default Users;
