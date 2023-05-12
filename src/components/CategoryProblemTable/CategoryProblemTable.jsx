import { Button, Modal, Table, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  createCategoryProblem,
  deleteCategoryProblem,
  updateCategoryProblem,
} from "../../http/categoryProblemApi";

const CategoryProblemTable = ({ categories, getAllCategoryProblem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addingCategory, setAddingCategory] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  const confirmDeleteCategory = (record) => {
    Modal.confirm({
      title: "Ви дійсно хочете видалити категорію?",
      okText: "Так",
      okType: "danger",
      cancelText: "Ні",
      onOk: () => onDeleteCategory(record),
    });
  };

  const columns = [
    {
      title: "Назва",
      dataIndex: "name",
      key: "name",
      width: "80%",
    },

    {
      title: "Дія",
      key: "action",
      width: "10vw",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => setEditing(record)}
              style={{ color: "blue" }}
            />
            <DeleteOutlined
              onClick={() => confirmDeleteCategory(record)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onDeleteCategory = (record) => {
    deleteCategoryProblem(record.id).then(() => getAllCategoryProblem());
  };

  const onEditCategory = () => {
    if (editingCategory !== null) {
      if (editingCategory.name.length !== 0)
        updateCategoryProblem(editingCategory).then(() =>
          getAllCategoryProblem()
        );
    }
    resetEditing();
  };
  const onAddCategory = () => {
    if (addingCategory !== null) {
      if (addingCategory.name.length !== 0)
        createCategoryProblem(addingCategory).then(() =>
          getAllCategoryProblem()
        );
    }
    resetAdding();
  };
  const setEditing = (record) => {
    setIsEditing(true);
    setEditingCategory({ ...record });
  };
  const resetAdding = () => {
    setIsAdding(false);
    setAddingCategory(null);
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingCategory(null);
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
        title="Додати категорію"
        open={isAdding}
        allowClear={false}
        cancelText="Відмінити"
        onCancel={() => resetAdding()}
        okText="Зберегти"
        onOk={() => {
          onAddCategory();
        }}
      >
        <Input
          placeholder="Назва"
          value={addingCategory?.name}
          onChange={(e) => {
            setAddingCategory((prev) => {
              return { ...prev, name: e.target.value };
            });
          }}
        ></Input>
      </Modal>
      <Table size={"small"} columns={columns} dataSource={categories} />
      <Modal
        title="Редагувати категорію"
        open={isEditing}
        cancelText="Відмінити"
        onCancel={() => resetEditing()}
        okText="Зберегти"
        onOk={() => {
          onEditCategory();
          resetEditing();
        }}
      >
        <Input
          placeholder="Назва"
          value={editingCategory?.name}
          onChange={(e) => {
            setEditingCategory((prev) => {
              return { ...prev, name: e.target.value };
            });
          }}
        ></Input>
      </Modal>
    </div>
  );
};

export default CategoryProblemTable;
