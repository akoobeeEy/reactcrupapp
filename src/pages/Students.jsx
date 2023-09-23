import { Fragment, useCallback, useContext, useEffect } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Table,
  Image,
  message,
  Popconfirm,
  Space,
} from "antd";

import { Context } from "../context/Context";
import { request } from "../server";

const StudentsPage = () => {
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
      render: (isMarried) => (
        <p className="text-xl">{isMarried ? "😎" : "😔"}</p>
      ),
    },
    {
      title: "IsWork",
      dataIndex: "isWork",
      key: "isWork",
      render: (isWork) => <p className="text-xl">{isWork ? "😎" : "😔"}</p>,
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
              onClick={() => editStudent(record.id)}
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
                onClick={() => studentDelete(record.id)}
                danger
                type="primary"
                className="duration-200 hover:-translate-y-1"
              >
                Delete
              </Button>
            </Popconfirm>
          </Space>
        </div>
      ),
    },
  ];

  const {
    isModalOpen,
    loading,
    setLoading,
    selected,
    setSelected,
    teacherId,
    students,
    setStudents,
    showModal,
    handleCancel,
    form,
    cancel,
    setIsModalOpen,
  } = useContext(Context);

  const studentData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await request.get(`teachers/${teacherId}/students`);
      setStudents(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setSelected]);

  useEffect(() => {
    studentData();
  }, [studentData]);

  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      if (selected === null) {
        await request.post(
          `teachers/${teacherId}/students`,
          values
        );
      } else {
        await request.put(`teachers/${teacherId}/students/${selected}`, values);
      }
      studentData();
      setIsModalOpen(false);
    } catch (err) {
      message(err);
    }
  };

  async function editStudent(id) {
    setSelected(id);
    setIsModalOpen(true);
    let { data } = await request.get(`teachers/${teacherId}/students/${id}`);

    form.setFieldsValue(data);
  }

  async function studentDelete(id) {
    await request.delete(`teachers/${teacherId}/students/${id}`);
    studentData();
  }
  return (
    <Fragment>
      <Table
        bordered
        title={() => (
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-2xl font-bold">
              Students <span className="ml-3"></span>
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
        dataSource={students}
      />
      ;
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        okText={selected === null ? "Add Student" : "Save Student"}
        okType="default"
        onCancel={handleCancel}
      >
        <Form
          initialValues={{
            isMarried: false,
            isWork: true,
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
        <Form.Item valuePropName="checked" name="isWork">
          <Checkbox>Is Work ?</Checkbox>
        </Form.Item>
      </Modal>
    </Fragment>
  );
};

export default StudentsPage;
