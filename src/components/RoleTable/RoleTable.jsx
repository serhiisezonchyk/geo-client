import { Button, Modal, Table, Input, Tag, Select } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { createRole, deleteRole, updateRole } from "../../http/roleApi";
import { createRolePolicy, deleteRolePolicy } from "../../http/rolePolicyApi";
import RoleAddingModal from "./RoleAddingModal";
import RoleEditingModal from "./RoleEditingModal";

const RoleTable = ({
  roles,
  getAllRoles,
  policies,
  rolePolicies,
  getAllRolePolicies,
}) => {
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
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
        if (record.name !== "superuser")
          return (
            <>
              <EditOutlined
                onClick={() => {
                  setEditing(record);
                }}
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
      createRolePolicy({ roleId: role.id, policyId: idPolicy }).then(() => {
        getAllRolePolicies();
      });
    });
  };
  const onEditRole = (values) => {
    if (values !== null) {
      if (values.name.length !== 0 && values.policy.length !== 0)
        updateRole({ id: editingRole.id, name: values.name }).then(() => {
          getAllRoles();
          chosenPolicy
            .filter((el) => values.policy.indexOf(el) < 0)
            .map((el) => onDeletePolicy(editingRole.id, el));
          onAddRolePolicy(
            values.policy.filter((el) => chosenPolicy.indexOf(el) < 0),
            editingRole
          );
        });
    }
    handleEditModalClose();
  };
  const onAddRole = (values) => {
    if (values !== null) {
      if (values.name.length !== 0) {
        createRole({ name: values.name }).then((data) => {
          getAllRoles();
          onAddRolePolicy(values.policy, data);
        });
      }
    }
    handleAddModalClose();
  };

  const setEditing = (record) => {
    setIsEditingModalOpen(true);
    setEditingRole({ ...record });
    setChosenPolicy(
      Array.from(record.policies).map(
        (pol) => (pol = policies.filter((el) => el.label === pol)[0].id)
      )
    );
  };

  const handleEditModalClose = () => {
    setIsEditingModalOpen(false);
    setEditingRole(null);
    setChosenPolicy(undefined);
  };
  const handleAddModalClose = () => {
    setIsAddingModalOpen(false);
  };
  return (
    <div style={{ width: "70vw", margin: "auto" }}>
      <Button
        onClick={() => setIsAddingModalOpen(true)}
        type="primary"
        style={{
          marginBottom: 16,
          float: "right",
        }}
      >
        Додати роль
      </Button>

      {isAddingModalOpen && (
        <RoleAddingModal
          onClose={handleAddModalClose}
          onAddRole={onAddRole}
          policies={policies}
        />
      )}
      <Table size={"small"} columns={columns} dataSource={roles} />

      {isEditingModalOpen && (
        <RoleEditingModal
          role={editingRole}
          chosenPolicy={chosenPolicy}
          onClose={handleEditModalClose}
          onEditRole={onEditRole}
          policies={policies}
        />
      )}
    </div>
  );
};

export default RoleTable;
