import { Fragment, useContext, useEffect } from "react";
import {
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  message,
} from "antd";
import { request } from "../server";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

const Teacher = () => {
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Image",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => (
        <Image className="avatar-img" width={100} src={avatar} />
      ),
    },
    {
      title: "IsMarried",
      dataIndex: "isMarried",
      key: "isMarried",
      render: (bool) => <p className="text-xl">{bool ? "😎" : "😔"}</p>,
    },

    {
      title: "Address",
      key: "address",
      dataIndex: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="">
          <Space size={"middle"}>
            <Button
              onClick={() => edit(record.id)}
              className="duration-200 bg-blue-500 hover:-translate-y-1"
              type="primary"
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              okType="default"
              cancelText="No"
            >
              <Button
                onClick={() => teachDelete(record.id)}
                danger
                type="primary"
                className="duration-200 hover:-translate-y-1"
              >
                Delete
              </Button>
            </Popconfirm>

            <Button
              onClick={() => teacherId(record.id)}
              className="text-black duration-200 bg-yellow-500 hover:-translate-y-1 hover:bg-yellow-500"
              type="primary"
            >
              Students
            </Button>
          </Space>
        </div>
      ),
    },
  ];
  const {
    setTeacherId,
    data,
    setData,
    setIsModalOpen,
    isModalOpen,
    form,
    selected,
    setSelected,
    showModal,
    handleCancel,
    loading,
    setLoading,
    confirm,
    cancel,
  } = useContext(Context);

  const navigate = useNavigate();
  
  async function teacherId(id) {
    let { data } = await request.get(`teachers/${id}`);
    setTeacherId(data.id);
    navigate("/students");
  }
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true)
      let { data } = await request("teachers");
      setData(data);
    } catch (err) {
      message(err);
    }finally{
      setLoading(false)
    }
  }

  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      if (selected) {
        await request.put(`teachers/${selected}`, values);
      } else {
        await request.post("teachers", values);
      }
      form.resetFields();
      getData();
      setIsModalOpen(false);
    } catch (err) {
      message(err);
    }
  };

  async function edit(id) {
    let { data } = await request.get(`teachers/${id}`);
    form.setFieldsValue(data);
    setSelected(id);
    showModal();
  }
  async function teachDelete(id) {
    await request.delete(`teachers/${id}`);
    console.log(data);
  }
  
  return (
    <Fragment>
      <Table
        bordered
        title={() => (
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-2xl font-bold">
              Teachers <span className="ml-3">{data.length}</span>
            </h1>
            <Input className="w-1/2 py-2 shadow-lg all-input shadow-blue-800" />
            <Button
              onClick={showModal}
              className="px-6 shadow-lg bg-slate-950 shadow-blue-800"
              type="primary"
            >
              Add
            </Button>
          </div>
        )}
        loading={loading}
        columns={columns}
        dataSource={data}
      />
      ;
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        okText={selected === null ? "Add Teacher" : "Save Teacher"}
        okType="default"
        onCancel={handleCancel}
      >
        <Form
          initialValues={{
            isMarried: false,
          }}
          name="modal"
          form={form}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="firstName"
            label="First name"
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please fill this field !",
              },
            ]}
            name="lastName"
            label="Last name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              { type: "url", warningOnly: true },
              {
                required: true,
                message: "Please fill this field !",
              },
            ]}
            name="avatar"
            label="Image"
          >
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone number">
            <Input />
          </Form.Item>

          <Form.Item valuePropName="checked" name="isMarried">
            <Checkbox>Is married ?</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};
export default Teacher;
