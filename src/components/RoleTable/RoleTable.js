import { Button, Modal, Table, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { createRole, deleteRole, updateRole } from "../../http/roleApi";

const RoleTable = ({ roles, getAllRoles }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [addingRole, setAddingRole] = useState(null);
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
      key: "policy",
      width: "50%",
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

  const onDeleteRole = (record) => {
    deleteRole(record.id).then(() => getAllRoles());
  };

  const onEditRole = () => {
    if (editingRole !== null) {
      if (editingRole.name.length !== 0)
        updateRole(editingRole).then(() => getAllRoles());
    }
    resetEditing();
  };
  const onAddRole = () => {
    if (addingRole !== null) {
      if (addingRole.name.length !== 0)
        createRole(addingRole).then(() => getAllRoles());
    }
    resetAdding();
  };
  const setEditing = (record) => {
    setIsEditing(true);
    setEditingRole({ ...record });
  };
  const resetAdding = () => {
    setIsAdding(false);
    setAddingRole(null);
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingRole(null);
  };
  return (
    <div style={{ width: "50vw", margin: "auto" }}>
      <Button
        onClick={() => setIsAdding(true)}
        type="primary"
        style={{
          marginBottom: 16,
          float: "right",
        }}
      >
        Додати категорію
      </Button>
      <Modal
        title="Додати роль"
        open={isAdding}
        allowClear={false}
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
      </Modal>
      <Table size={"small"} columns={columns} dataSource={roles} />
      <Modal
        title="Редагувати роль"
        open={isEditing}
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
      </Modal>
    </div>
  );
};

export default RoleTable;
