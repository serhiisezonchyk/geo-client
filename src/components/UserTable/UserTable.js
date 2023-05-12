import { Button, Modal, Table, Input, Select } from "antd";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { createUser, deleteUser } from "../../http/userApi";
import cl from "./UserTable.module.css";
const { Option } = Select;

const UserTable = ({ users, getAllUsers, roles }) => {
  const copyArr = [...users];
  copyArr.forEach((el) => {
    el["userName"] = el.role.name;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [addingUser, setAddingUser] = useState(null);
  const [chosenRole, setChosenRole] = useState(null);
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

  const onDeleteUser = (record) => {
    deleteUser(record.id).then(() => getAllUsers());
  };

  const onAddUser = () => {
    if (addingUser !== null) {
      if (addingUser.email.length !== 0 && addingUser.password.length !== 0)
        createUser(addingUser.email, addingUser.password, chosenRole).then(() =>
          getAllUsers()
        );
    }
    resetAdding();
  };

  const resetAdding = () => {
    setIsAdding(false);
    setAddingUser(null);
  };
  console.log(roles);
  return (
    <div style={{ width: "90vw", margin: "auto" }}>
      <Button
        onClick={() => setIsAdding(true)}
        type="primary"
        style={{
          marginBottom: 16,
          float: "right",
        }}
      >
        Додати користувача
      </Button>
      <Modal
        className={cl.ant__modal}
        title="Додати користувача"
        open={isAdding}
        allowClear={false}
        cancelText="Відмінити"
        onCancel={() => resetAdding()}
        okText="Зберегти"
        onOk={() => {
          onAddUser();
        }}
      >
        <Input
          placeholder="Email"
          value={addingUser?.label}
          type="email"
          onChange={(e) => {
            setAddingUser((prev) => {
              return { ...prev, email: e.target.value };
            });
          }}
        ></Input>
        <Input
          placeholder="Пароль"
          value={addingUser?.password}
          onChange={(e) => {
            setAddingUser((prev) => {
              return { ...prev, password: e.target.value };
            });
          }}
        ></Input>
        <Select
          showSearch
          placeholder="Виберіть роль"
          onChange={(e) => setChosenRole(e)}
        >
          {roles.map((el) => (
            <Option value={el.id} key={el.id}>
              {el.name}
            </Option>
          ))}
        </Select>
      </Modal>
      <Table columns={columns} dataSource={copyArr} />
    </div>
  );
};

export default UserTable;
