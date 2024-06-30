import { TinyColor } from "@ctrl/tinycolor";
import {
  Button,
  ConfigProvider,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Radio,
  Space,
  Table,
  Typography,
  Upload,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import "./index.scss"; // Path to your CSS file
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../utils/upload";

const { Title } = Typography;
const colors2 = ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"];

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function OrchidManagement() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingOrchid, setEditingOrchid] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [addForm] = useForm();
  const [editForm] = useForm();

  useEffect(() => {
    fetchOrchids();
  }, []);

  const fetchOrchids = async () => {
    try {
      const response = await axios.get(
        "https://6639cdef1ae792804becd314.mockapi.io/orchids",
      );
      setDataSource(response.data);
    } catch (error) {
      message.error("Failed to fetch orchids!");
    }
  };

  const handleOpenModal = () => {
    setFileList([]);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    addForm.resetFields();
    setFileList([]);
  };

  const handleEditModal = (record) => {
    setEditingOrchid({ ...record });
    setIsEditing(true);
  };

  const getPresetFileList = () => {
    if (!editingOrchid || !editingOrchid.image) return [];
    return [
      {
        uid: "1",
        name: editingOrchid.name,
        status: "done",
        url: editingOrchid.image,
      },
    ];
  };

  useEffect(() => {
    if (isEditing) {
      setFileList(getPresetFileList());
      editForm.setFieldsValue({
        name: editingOrchid.name,
        origin: editingOrchid.origin,
        rating: editingOrchid.rating,
        category: editingOrchid.category,
        isSpecial: editingOrchid.isSpecial,
        image: getPresetFileList(),
      });
    }
  }, [isEditing, editForm, editingOrchid]);

  const handleUpdate = async (values) => {
    if (!Array.isArray(fileList)) {
      console.error("Expected fileList to be an array but got", fileList);
      message.error("File list is not valid!");
      return;
    }

    const updatedImage = await Promise.all(
      fileList.map((file) =>
        file.originFileObj ? uploadFile(file.originFileObj) : file.url,
      ),
    );

    const updatedOrchid = {
      ...editingOrchid,
      ...values,
      image: updatedImage[0] || editingOrchid.image,
    };

    try {
      await axios.put(
        `https://6639cdef1ae792804becd314.mockapi.io/orchids/${editingOrchid.id}`,
        updatedOrchid,
      );
      const newDataSource = dataSource.map((item) =>
        item.id === editingOrchid.id ? updatedOrchid : item,
      );
      setDataSource(newDataSource);
      setIsEditing(false);
      setEditingOrchid(null);
      message.success("Orchid updated successfully!");
    } catch (error) {
      message.error("Failed to update orchid!");
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());

  const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

  const handleOk = () => {
    addForm.submit();
  };

  const handleSubmit = async (values) => {
    const images = await Promise.all(
      fileList.map((file) => uploadFile(file.originFileObj)),
    );

    values.image = images[0];
    values.createdAt = new Date();

    try {
      const response = await axios.post(
        "https://6639cdef1ae792804becd314.mockapi.io/orchids",
        values,
      );

      setDataSource([...dataSource, response.data]);

      handleCloseModal();
      addForm.resetFields();
      setFileList([]);
      message.success("Orchid added successfully!");
    } catch (error) {
      message.error("Failed to add orchid!");
    }
  };

  const handleDelete = async (key) => {
    try {
      await axios.delete(
        `https://6639cdef1ae792804becd314.mockapi.io/orchids/${key}`,
      );
      const listOrchids = dataSource.filter((item) => item.id !== key);
      setDataSource(listOrchids);
      message.success("Orchid deleted successfully!");
    } catch (error) {
      message.error("Failed to delete orchid!");
    }
  };

  const [value, setValue] = useState(1);
  const onChangeSpecial = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: "Orchid",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      align: "center",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      align: "center",
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image src={image} width={100} />,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (key, record) => (
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={() => handleEditModal(record)}
            style={{ marginRight: 8 }}
          >
            Update
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDelete(key)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <Title>Orchid Management</Title>
      <Space>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: `linear-gradient(90deg,  ${colors2.join(", ")})`,
                colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(
                  colors2,
                ).join(", ")})`,
                colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(
                  colors2,
                ).join(", ")})`,
                lineWidth: 0,
              },
            },
          }}
        >
          <Button type="primary" size="large" onClick={handleOpenModal}>
            Add Orchid
          </Button>
          <Modal
            title="Orchid Management"
            open={isOpen}
            onCancel={handleCloseModal}
            onOk={handleOk}
            okText="Add"
          >
            <Form
              form={addForm}
              layout="vertical"
              onFinish={handleSubmit}
              style={{ marginTop: 20 }}
            >
              <Form.Item
                name="name"
                label="Orchid Name"
                rules={[
                  { required: true, message: "Please enter orchid name" },
                ]}
              >
                <Input placeholder="Orchid Name" />
              </Form.Item>
              <Form.Item
                name="origin"
                label="Origin"
                rules={[{ required: true, message: "Please enter origin" }]}
              >
                <Input placeholder="Origin" />
              </Form.Item>
              <Form.Item
                name="rating"
                label="Rating"
                rules={[{ required: true, message: "Please enter rating" }]}
              >
                <Input placeholder="Rating" />
              </Form.Item>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: "Please enter category" }]}
              >
                <Input placeholder="Category" />
              </Form.Item>
              <Form.Item label="Special" name="isSpecial">
                <Radio.Group onChange={onChangeSpecial} value={value}>
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="image" label="Image">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </Form.Item>
            </Form>
          </Modal>
          {previewOpen && (
            <Modal
              open={previewOpen}
              title="Image Preview"
              footer={null}
              onCancel={() => setPreviewOpen(false)}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          )}
        </ConfigProvider>
      </Space>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey="id"
        style={{ marginTop: 20 }}
      />
      <Modal
        title="Edit Orchid"
        open={isEditing}
        onCancel={() => {
          setIsEditing(false);
          setEditingOrchid(null);
        }}
        onOk={() => editForm.submit()}
        okText="Update"
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleUpdate}
          style={{ marginTop: 20 }}
        >
          <Form.Item
            name="name"
            label="Orchid Name"
            rules={[{ required: true, message: "Please enter orchid name" }]}
          >
            <Input placeholder="Orchid Name" />
          </Form.Item>
          <Form.Item
            name="origin"
            label="Origin"
            rules={[{ required: true, message: "Please enter origin" }]}
          >
            <Input placeholder="Origin" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please enter category" }]}
          >
            <Input placeholder="Category" />
          </Form.Item>
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: "Please enter rating" }]}
          >
            <Input placeholder="Rating" />
          </Form.Item>
          <Form.Item label="Special" name="isSpecial">
            <Radio.Group onChange={onChangeSpecial} value={value}>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>
          {/* <Form.Item
            name="image"
            label="Image"
            rules={[{ required: true, message: "Please enter category" }]}
          >
            <Input placeholder="Image" />
          </Form.Item> */}
          <Form.Item name="image" label="Image">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default OrchidManagement;
