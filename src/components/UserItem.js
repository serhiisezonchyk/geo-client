import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Context } from "../index";
import { fetchOneRole } from "../http/roleApi";
import { deleteUser } from "../http/userApi";

const UserItem = ({singleUser}) => {
  const [role, setRole] = useState("");
  useEffect(() => {
    fetchOneRole(singleUser.roleId).then((data) => setRole(data.name));
  }, []);

  return (
    <tr>
      <td>{singleUser.email}</td>
      <td>{singleUser.password}</td>
      <td>{role}</td>
      <td>
        <Button
          variant="outline-danger"
          onClick={() => {
            if (window.confirm("Delete this user?"))
              deleteUser(singleUser.id);
            window.location.reload();
          }}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default UserItem;
