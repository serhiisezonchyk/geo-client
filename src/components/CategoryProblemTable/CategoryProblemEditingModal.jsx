import { Modal, Input } from "antd";
import { Form } from "antd";
import { useEffect } from "react";

const CategoryProblemEditingModal = ({ category, onClose, onEditCategory }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ name: category.name });
  }, []);

  return (
    <Modal
      title="Редагувати категорію"
      open={true}
      allowClear={true}
      cancelText="Відмінити"
      onCancel={() => onClose()}
      okText="Зберегти"
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onEditCategory(values);
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
      </Form>
    </Modal>
  );
};

export default CategoryProblemEditingModal;
