import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { fetchAllUsers } from "../http/userApi";
import UserItem from "./UserItem";

const UserList = (users) => {
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
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
