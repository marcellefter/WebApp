import { UserInterface } from "../interface/interface";
import User from "../componests/User/User";
import { useQuery } from "react-query";
import Form from "../componests/Form/Form";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const fetchUsers = async () => {
  const res = await fetch("http://localhost:3001/users");
  return res.json();
};

const Users = () => {
  const history = useHistory();
  const [showForm, setShowForm] = useState(false);
  const [editedUser, setEditedUser] = useState<UserInterface | null>(null);
  const response = useQuery("users", fetchUsers);

  const deleteUserHandler = (id: string) => {
    console.log("delete");

    axios
      .delete(`http://localhost:3001/users/${id}`)
      .catch((error) => console.log(error));

    history.go(0);
  };

  const editUserHandler = (id: string) => {
    console.log("edit");
    setShowForm(true);

    axios
      .get<UserInterface>(`http://localhost:3001/users/${id}`)
      .then((res) => setEditedUser(res.data))
      .catch((error) => console.log(error));
  };

  return (
    <>
      {showForm && (
        <Form user={editedUser} onClose={() => setShowForm(false)} />
      )}
      <ul>
        {response.isError && <p>Response error</p>}
        {response.isLoading && <p>Information is loading...</p>}
        {response.status === "success" &&
          response.data.map((item: UserInterface) => (
            <User
              user={item}
              onDelete={deleteUserHandler}
              onEdit={editUserHandler}
            />
          ))}
      </ul>
    </>
  );
};

export default Users;
