import React, { useState, useEffect, useContext } from "react";
import { Context } from "../index";

import { Container } from "react-bootstrap";
import { Tabs } from "antd";
import { fetchAllUsers } from "../http/userApi";
import { fetchAllRoles } from "../http/roleApi";
import { fetchAllPolicies } from "../http/policyApi";
import { fetchAllCategoryProblem } from "../http/categoryProblemApi";
import UserTable from "../components/UserTable/UserTable";
import CategoryProblemTable from "../components/CategoryProblemTable/CategoryProblemTable";
import RoleTable from "../components/RoleTable/RoleTable";
import PolicyTable from "../components/PolicyTable/PolicyTable";
import { fetchAllRolePolicy } from "../http/rolePolicyApi";
import { Navigate } from "react-router-dom";

const SuperuserPage = () => {
  const { user } = useContext(Context);

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [rolePolicy, setRolePolicy] = useState([]);
  useEffect(() => {
    getAllCategoryProblem();
    getAllPolicies();
    getAllRoles();
    getAllUsers();
    getAllRolePolicy();
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
  const getAllRolePolicy = () => {
    fetchAllRolePolicy().then((data) => setRolePolicy(data));
  };

  if (user.user.role !== "superuser") return <Navigate to="/" />;

  const extendedRoles = roles.map((role) => {
    return {
      ...role,
      policies: new Set(
        rolePolicy
          .filter((rolePol) => rolePol.roleId === role.id)
          .map(
            (rolePol) =>
              policies[
                policies.indexOf(
                  policies.find((policy) => policy.id === rolePol.policyId)
                )
              ].label
          )
      ),
    };
  });
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
          <RoleTable
            roles={extendedRoles}
            getAllRoles={getAllRoles}
            policies={policies}
            rolePolicies={rolePolicy}
            getAllRolePolicies={getAllRolePolicy}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Права" key="policies">
          <PolicyTable policies={policies} getAllPolicies={getAllPolicies} />
        </Tabs.TabPane>
      </Tabs>
    </Container>
  );
};

export default SuperuserPage;
