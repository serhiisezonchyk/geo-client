import { Button, Modal, Table } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { createPolicy, deletePolicy, updatePolicy } from "../../http/policyApi";
import PolicyEditingModal from "./PolicyEditingModal";
import PolicyAddingModal from "./PolicyAddingModal";

const PolicyTable = ({ policies, getAllPolicies }) => {
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);

  const confirmDeletePolicy = (record) => {
    Modal.confirm({
      title: "Ви дійсно хочете видалити права?",
      okText: "Так",
      okType: "danger",
      cancelText: "Ні",
      onOk: () => onDeletePolicy(record),
    });
  };

  const columns = [
    {
      title: "Мітка",
      dataIndex: "label",
      key: "label",
      width: "20%",
    },
    {
      title: "Назва",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Опис",
      dataIndex: "description",
      key: "description",
      width: "50%",
    },
    {
      title: "Дія",
      key: "action",
      width: "10%",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => setEditing(record)}
              style={{ color: "blue" }}
            />
            <DeleteOutlined
              onClick={() => confirmDeletePolicy(record)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onDeletePolicy = (record) => {
    deletePolicy(record.id).then(() => getAllPolicies());
  };

  const onEditPolicy = (values) => {
    console.log("val", values);
    if (values !== null)
      updatePolicy({
        id: editingPolicy.id,
        name: values.name,
        label: values.label,
        description: values.description,
      }).then(() => getAllPolicies());

    handleEditModalClose();
  };
  const onAddPolicy = (values) => {
    if (values !== null)
      createPolicy({
        name: values.name,
        label: values.label,
        description: values.description,
      }).then(() => getAllPolicies());
    handleAddModalClose();
  };
  const setEditing = (record) => {
    setIsEditingModalOpen(true);
    setEditingPolicy({ ...record });
  };
  const handleEditModalClose = () => {
    setIsEditingModalOpen(false);
    setEditingPolicy(null);
  };
  const handleAddModalClose = () => {
    setIsAddingModalOpen(false);
  };
  return (
    <div style={{ width: "80vw", margin: "auto" }}>
      <Button
        onClick={() => setIsAddingModalOpen(true)}
        type="primary"
        style={{
          marginBottom: 16,
          float: "right",
        }}
      >
        Додати права
      </Button>
      {isAddingModalOpen && (
        <PolicyAddingModal
          onClose={handleAddModalClose}
          onAddPolicy={onAddPolicy}
        />
      )}
      <Table size={"small"} columns={columns} dataSource={policies} />
      {isEditingModalOpen && (
        <PolicyEditingModal
          policy={editingPolicy}
          onClose={handleEditModalClose}
          onEditPolicy={onEditPolicy}
        />
      )}
    </div>
  );
};

export default PolicyTable;
