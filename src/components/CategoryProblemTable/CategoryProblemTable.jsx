import { Button, Modal, Table } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  createCategoryProblem,
  deleteCategoryProblem,
  updateCategoryProblem,
} from "../../http/categoryProblemApi";
import CategoryProblemAddingModal from "./CategoryProblemAddingModal";
import CategoryProblemEditingModal from "./CategoryProblemEditingModal";

const CategoryProblemTable = ({ categories, getAllCategoryProblem }) => {
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
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

  const onEditCategory = (values) => {
    if (values !== null)
      updateCategoryProblem({ id: editingCategory.id, name: values.name }).then(
        () => getAllCategoryProblem()
      );
    handleEditModalClose();
  };
  const onAddCategory = (values) => {
    if (values !== null)
      createCategoryProblem({ name: values.name }).then(() =>
        getAllCategoryProblem()
      );
    handleAddModalClose();
  };
  const setEditing = (record) => {
    setIsEditingModalOpen(true);
    setEditingCategory({ ...record });
  };

  const handleEditModalClose = () => {
    setIsEditingModalOpen(false);
    setEditingCategory(null);
  };
  const handleAddModalClose = () => {
    setIsAddingModalOpen(false);
  };
  return (
    <div style={{ width: "50vw", margin: "auto" }}>
      <Button
        onClick={() => setIsAddingModalOpen(true)}
        type="primary"
        style={{
          marginBottom: 16,
          float: "right",
        }}
      >
        Додати категорію
      </Button>
      {isAddingModalOpen && (
        <CategoryProblemAddingModal
          onClose={handleAddModalClose}
          onAddCategory={onAddCategory}
        />
      )}
      <Table size={"small"} columns={columns} dataSource={categories} />
      {isEditingModalOpen && (
        <CategoryProblemEditingModal
          category={editingCategory}
          onClose={handleEditModalClose}
          onEditCategory={onEditCategory}
        />
      )}
    </div>
  );
};

export default CategoryProblemTable;
