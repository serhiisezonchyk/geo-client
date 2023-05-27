import { Modal, Input } from "antd";
import { Form } from "antd";

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
          label="Назва"
          name="name"
          rules={[
            {
              required: true,
              message: "Введіть назву!",
            },
          ]}
        >
          <Input />
        </Form.Item>
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
