import { Button, Modal, Table, Input, Select } from "antd";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { createUser, deleteUser } from "../../http/userApi";
import UserAddingModal from "./UserAddingModal";

const UserTable = ({ users, getAllUsers, roles }) => {
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);

  const copyArr = [...users];
  copyArr.forEach((el) => {
    el["userName"] = el.role.name;
  });

  const confirmDeleteUser = (record) => {
    Modal.confirm({
      title: "Ви дійсно хочете видалити користувача?",
      okText: "Так",
      okType: "danger",
      cancelText: "Ні",
      onOk: () => onDeleteUser(record),
    });
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
    },
    {
      title: "Пароль",
      dataIndex: "password",
      key: "password",
      width: "30%",
    },
    {
      title: "Користувач",
      dataIndex: "userName",
      key: "userName",
      width: "10%",
    },
    {
      title: "Дія",
      key: "action",
      width: "10%",
      render: (record) => {
        return (
          <>
            <DeleteOutlined
              onClick={() => confirmDeleteUser(record)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];
  const handleModalClose = () => {
    setIsAddingModalOpen(false);
  };
  const onDeleteUser = (record) => {
    deleteUser(record.id).then(() => getAllUsers());
  };

  const onAddUser = (values) => {
    if (values !== null) {
      if (values.email.length !== 0 && values.password.length !== 0)
        createUser(values.email, values.password, values.role).then(() =>
          getAllUsers()
        );
    }
    setIsAddingModalOpen(false);
  };

  return (
    <div style={{ width: "90vw", margin: "auto" }}>
      <Button
        onClick={() => setIsAddingModalOpen(true)}
        type="primary"
        style={{
          marginBottom: 16,
          float: "right",
        }}
      >
        Додати користувача
      </Button>
      {isAddingModalOpen && (
        <UserAddingModal
          onClose={handleModalClose}
          onAddUser={onAddUser}
          roles={roles}
        />
      )}
      <Table columns={columns} dataSource={copyArr} scroll={{ x: "90vw" }} />
    </div>
  );
};

export default UserTable;
