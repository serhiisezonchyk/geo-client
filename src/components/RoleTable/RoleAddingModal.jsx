import { Modal, Input, Select } from "antd";
import { Form } from "antd";
import cl from "./RoleTable.module.css";
const { Option } = Select;

const RoleAddingModal = ({ onClose, onAddRole, policies }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      className={cl.ant__modal}
      title="Додати роль"
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
            onAddRole(values);
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
          label="Назва"
          name="name"
          rules={[
            {
              required: true,
              message: "Введіть назву!",
            },
          ]}
        >
          <Input placeholder="Назва" />
        </Form.Item>
        <Form.Item
          label="Права"
          name="policy"
          rules={[
            {
              required: true,
              message: "Оберіть права!",
            },
          ]}
        >
          <Select
            showSearch
            mode="tags"
            placeholder="Виберіть права"
            style={{ width: "100%" }}
          >
            {policies.map((el) => (
              <Option value={el.id} key={el.id}>
                {el.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoleAddingModal;
