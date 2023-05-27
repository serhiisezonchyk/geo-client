import { Modal, Input, Select } from "antd";
import { Button, Checkbox, Form } from "antd";
import { useState } from "react";
import cl from "./UserTable.module.css";
const { Option } = Select;

const UserAddingModal = ({ onClose, onAddUser, roles }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      className={cl.ant__modal}
      title="Додати користувача"
      open={true}
      allowClear={false}
      cancelText="Відмінити"
      onCancel={() => onClose()}
      okText="Зберегти"
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            console.log(values);
            onAddUser(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        name="basic"
        autoComplete="off"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Введіть email!",
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
              message: "Введіть пароль!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Роль"
          name="role"
          rules={[
            {
              required: true,
              message: "Оберіть роль!",
            },
          ]}
        >
          <Select showSearch placeholder="Виберіть роль">
            {roles.map((el) => (
              <Option value={el.id} key={el.id}>
                {el.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserAddingModal;
