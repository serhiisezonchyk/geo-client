import { Modal, Input, Select } from "antd";
import { Form } from "antd";
import { policyNames } from "../../utils/policyNames";
const { Option } = Select;

const PolicyAddingModal = ({ onClose, onAddPolicy }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title="Додати права"
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
            onAddPolicy(values);
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
          label="Мітка"
          name="label"
          rules={[
            {
              required: true,
              message: "Введіть мітку!",
            },
          ]}
        >
          <Input />
        </Form.Item>
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
          <Select mode="multiple" style={{ width: "100%" }}>
            {policyNames.map((el) => (
              <Option value={el} key={el}>
                {el}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Опис"
          name="description"
          rules={[
            {
              required: true,
              message: "Введіть опис!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PolicyAddingModal;
