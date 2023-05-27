import { Modal, Input } from "antd";
import { Form } from "antd";

const CategoryProblemAddingModal = ({ onClose, onAddCategory }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title="Додати категорію"
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
            onAddCategory(values);
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
      </Form>
    </Modal>
  );
};

export default CategoryProblemAddingModal;
