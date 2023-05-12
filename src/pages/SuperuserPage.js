import React, { useState, useEffect } from "react";

import { Col, Container, Row } from "react-bootstrap";
import { Tabs } from "antd";
import { fetchAllUsers } from "../http/userApi";
import { fetchAllRoles } from "../http/roleApi";
import { fetchAllPolicies } from "../http/policyApi";
import { fetchAllCategoryProblem } from "../http/categoryProblemApi";
import UserTable from "../components/UserTable/UserTable";
import CategoryProblemTable from "../components/CategoryProblemTable/CategoryProblemTable";
import RoleTable from "../components/RoleTable/RoleTable";
import PolicyTable from "../components/PolicyTable/PolicyTable";

const SuperuserPage = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategoryProblem();
    getAllPolicies();
    getAllRoles();
    getAllUsers();
  }, []);

  const getAllCategoryProblem = () => {
    fetchAllCategoryProblem().then((data) => setCategories(data));
  };
  const getAllPolicies = () => {
    fetchAllPolicies().then((data) => setPolicies(data));
  };
  const getAllUsers = () => {
    fetchAllUsers().then((data) => setUsers(data));
  };
  const getAllRoles = () => {
    fetchAllRoles().then((data) => setRoles(data));
  };

  console.log("Roles", roles);
  console.log("Pol", policies);
  return (
    <Container>
      <Tabs>
        <Tabs.TabPane tab="Користувачі" key="user">
          <UserTable users={users} getAllUsers={getAllUsers} roles={roles} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Категорії" key="categories">
          <CategoryProblemTable
            categories={categories}
            getAllCategoryProblem={getAllCategoryProblem}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Ролі" key="roles">
          <RoleTable roles={roles} getAllRoles={getAllRoles} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Права" key="policies">
          <PolicyTable policies={policies} getAllPolicies={getAllPolicies} />
        </Tabs.TabPane>
      </Tabs>
    </Container>
  );
};

export default SuperuserPage;
