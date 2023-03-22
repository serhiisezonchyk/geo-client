import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Context } from "../index";
import UserItem from "./UserItem";

const UserList = observer(() => {
  const { users } = useContext(Context);

  console.log(users);
  users.users.map((singleUser) => console.log(singleUser));
  return (
    <div className="row justify-content-center">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Пароль</th>
            <th>Роль</th>
            <th>Дія</th>
          </tr>
        </thead>
        <tbody>
          {users.users.map((singleUser) => (
            <UserItem key={singleUser.id} singleUser={singleUser} />
          ))}
          <tr>
            <td>email</td>
            <td>pass</td>
            <td>role</td>
            <td>
              <Button variant="outline-success">Додати</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
});

export default UserList;
