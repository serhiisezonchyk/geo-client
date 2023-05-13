import { Button, Modal, Table, Input, Tag, Select } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { createRole, deleteRole, updateRole } from "../../http/roleApi";
import {
  createRolePolicy,
  deleteRolePolicy,
  updateRolePolicy,
} from "../../http/rolePolicyApi";
import cl from "./RoleTable.module.css";
const { Option } = Select;

const RoleTable = ({
  roles,
  getAllRoles,
  policies,
  rolePolicies,
  getAllRolePolicies,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [addingRole, setAddingRole] = useState(null);
  const [chosenPolicy, setChosenPolicy] = useState(undefined);

  const confirmDeleteRole = (record) => {
    Modal.confirm({
      title: "Ви дійсно хочете видалити роль?",
      okText: "Так",
      okType: "danger",
      cancelText: "Ні",
      onOk: () => onDeleteRole(record),
    });
  };

  const columns = [
    {
      title: "Назва",
      dataIndex: "name",
      key: "name",
      width: "50%",
    },
    {
      title: "Права",
      key: "policies",
      dataIndex: "policies",
      width: "30%",
      render: (records) => (
        <span>
          {Array.from(records).map((policy) => {
            if (policy.size != 0) return <Tag key={policy}>{policy}</Tag>;
          })}
        </span>
      ),
    },
    {
      title: "Дія",
      key: "action",
      width: "10%",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => setEditing(record)}
              style={{ color: "blue" }}
            />
            <DeleteOutlined
              onClick={() => confirmDeleteRole(record)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];
  const onDeleteRolePolicy = (id) => {
    rolePolicies
      .filter((el) => el.roleId === id)
      .map((el) => {
        deleteRolePolicy(el.id).then(() => getAllRolePolicies());
      });
  };
  const onDeletePolicy = (roleId, policyId) => {
    rolePolicies
      .filter((el) => el.roleId === roleId)
      .map((el) => {
        if (el.policyId === policyId)
          deleteRolePolicy(el.id).then(() => getAllRolePolicies());
      });
  };
  const onDeleteRole = (record) => {
    deleteRole(record.id).then(() => getAllRoles());
    onDeleteRolePolicy(record.id);
  };

  const onAddRolePolicy = (policy, role) => {
    policy.map((idPolicy) => {
      createRolePolicy({ roleId: role.id, policyId: idPolicy }).then(() =>
        getAllRolePolicies()
      );
    });
  };
  const onEditRole = () => {
    const actualPolicies = Array.from(editingRole.policies).map(
      (pol) => (pol = policies.filter((el) => el.label === pol)[0].id)
    );
    if (editingRole !== null) {
      if (editingRole.name.length !== 0 && chosenPolicy.length !== 0)
        updateRole(editingRole).then(() => {
          getAllRoles();
          actualPolicies
            .filter((el) => chosenPolicy.indexOf(el) < 0)
            .map((el) => onDeletePolicy(editingRole.id, el));
          onAddRolePolicy(
            chosenPolicy.filter((el) => actualPolicies.indexOf(el) < 0),
            editingRole
          );
        });
    }
    resetEditing();
  };
  const onAddRole = () => {
    if (addingRole !== null && chosenPolicy !== undefined) {
      if (addingRole.name.length !== 0) {
        createRole(addingRole).then((data) => {
          getAllRoles();
          onAddRolePolicy(chosenPolicy, data);
        });
      }
    }

    resetAdding();
  };
  const setEditing = (record) => {
    setIsEditing(true);
    setEditingRole({ ...record });
    setChosenPolicy(
      Array.from(record.policies).map(
        (pol) => (pol = policies.filter((el) => el.label === pol)[0].id)
      )
    );
  };
  const resetAdding = () => {
    setIsAdding(false);
    setAddingRole(null);
    setChosenPolicy(undefined);
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingRole(null);
    setChosenPolicy(undefined);
  };

  return (
    <div style={{ width: "70vw", margin: "auto" }}>
      <Button
        onClick={() => setIsAdding(true)}
        type="primary"
        style={{
          marginBottom: 16,
          float: "right",
        }}
      >
        Додати роль
      </Button>
      <Modal
        title="Додати роль"
        open={isAdding}
        className={cl.ant__modal}
        cancelText="Відмінити"
        onCancel={() => resetAdding()}
        okText="Зберегти"
        onOk={() => {
          onAddRole();
        }}
      >
        <Input
          placeholder="Назва"
          value={addingRole?.name}
          onChange={(e) => {
            setAddingRole((prev) => {
              return { ...prev, name: e.target.value };
            });
          }}
        ></Input>
        <Select
          showSearch
          mode="tags"
          value={chosenPolicy}
          placeholder="Виберіть права"
          style={{ width: "100%" }}
          onChange={(e) => {
            setChosenPolicy(e);
          }}
        >
          {policies.map((el) => (
            <Option value={el.id} key={el.id}>
              {el.label}
            </Option>
          ))}
        </Select>
      </Modal>
      <Table size={"small"} columns={columns} dataSource={roles} />
      <Modal
        title="Редагувати роль"
        open={isEditing}
        className={cl.ant__modal}
        cancelText="Відмінити"
        onCancel={() => resetEditing()}
        okText="Зберегти"
        onOk={() => {
          onEditRole();
          resetEditing();
        }}
      >
        <Input
          placeholder="Назва"
          value={editingRole?.name}
          onChange={(e) => {
            setEditingRole((prev) => {
              return { ...prev, name: e.target.value };
            });
          }}
        ></Input>
        <Select
          showSearch
          mode="tags"
          value={chosenPolicy}
          placeholder="Виберіть права"
          style={{ width: "100%" }}
          onChange={(e) => {
            setChosenPolicy(e);
          }}
        >
          {policies.map((el) => (
            <Option value={el.id} key={el.id}>
              {el.label}
            </Option>
          ))}
        </Select>
      </Modal>
    </div>
  );
};

export default RoleTable;
