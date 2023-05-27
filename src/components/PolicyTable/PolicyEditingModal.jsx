import { Modal, Input } from "antd";
import { Form } from "antd";
import { useEffect } from "react";

const PolicyEditingModal = ({ policy, onClose, onEditPolicy }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      name: policy.name,
      label: policy.label,
      description: policy.description,
    });
  }, []);
  return (
    <Modal
      title="Редагувати права"
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
            onEditPolicy(values);
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

export default PolicyEditingModal;
