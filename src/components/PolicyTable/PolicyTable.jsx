import { Button, Modal, Table, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { createPolicy, deletePolicy, updatePolicy } from "../../http/policyApi";
import cl from "./PolicyTable.module.css";
const { TextArea } = Input;

const PolicyTable = ({ policies, getAllPolicies }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addingPolicy, setAddingPolicy] = useState(null);
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

  const onEditPolicy = () => {
    if (editingPolicy !== null) {
      if (editingPolicy.name.length !== 0 && addingPolicy.label.length !== 0)
        updatePolicy(editingPolicy).then(() => getAllPolicies());
    }
    resetEditing();
  };
  const onAddPolicy = () => {
    if (addingPolicy !== null) {
      if (addingPolicy.name.length !== 0 && addingPolicy.label.length !== 0)
        createPolicy(addingPolicy).then(() => getAllPolicies());
    }
    resetAdding();
  };
  const setEditing = (record) => {
    setIsEditing(true);
    setEditingPolicy({ ...record });
  };
  const resetAdding = () => {
    setIsAdding(false);
    setAddingPolicy(null);
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingPolicy(null);
  };
  return (
    <div style={{ width: "80vw", margin: "auto" }}>
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
        className={cl.ant__modal}
        title="Додати права"
        open={isAdding}
        allowClear={false}
        cancelText="Відмінити"
        onCancel={() => resetAdding()}
        okText="Зберегти"
        onOk={() => {
          onAddPolicy();
        }}
      >
        <Input
          placeholder="Мітка"
          value={addingPolicy?.label}
          onChange={(e) => {
            setAddingPolicy((prev) => {
              return { ...prev, label: e.target.value };
            });
          }}
        ></Input>
        <Input
          placeholder="Назва"
          value={addingPolicy?.name}
          onChange={(e) => {
            setAddingPolicy((prev) => {
              return { ...prev, name: e.target.value };
            });
          }}
        ></Input>
        <TextArea
          placeholder="Опис"
          value={addingPolicy?.description}
          onChange={(e) => {
            setAddingPolicy((prev) => {
              return { ...prev, description: e.target.value };
            });
          }}
        ></TextArea>
      </Modal>
      <Table size={"small"} columns={columns} dataSource={policies} />
      <Modal
        className={cl.ant__modal}
        title="Редагувати категорію"
        open={isEditing}
        cancelText="Відмінити"
        onCancel={() => resetEditing()}
        okText="Зберегти"
        onOk={() => {
          onEditPolicy();
          resetEditing();
        }}
      >
        <Input
          placeholder="Мітка"
          value={editingPolicy?.label}
          onChange={(e) => {
            setEditingPolicy((prev) => {
              return { ...prev, label: e.target.value };
            });
          }}
        ></Input>
        <Input
          placeholder="Назва"
          value={editingPolicy?.name}
          onChange={(e) => {
            setEditingPolicy((prev) => {
              return { ...prev, name: e.target.value };
            });
          }}
        ></Input>
        <TextArea
          placeholder="Опис"
          value={editingPolicy?.description}
          onChange={(e) => {
            setEditingPolicy((prev) => {
              return { ...prev, description: e.target.value };
            });
          }}
        ></TextArea>
      </Modal>
    </div>
  );
};

export default PolicyTable;
