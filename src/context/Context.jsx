import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { Form, message } from "antd";

export const Context = createContext();
const ContextFirst = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);

  const [teacherId, setTeacherId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  const state = {
    loading,
    setLoading,
    selected,
    setSelected,
    teacherId,
    setTeacherId,
    data,
    setData,
    confirm,
    cancel,
    form,
    isModalOpen,
    setIsModalOpen,
    showModal,
    handleCancel,
    setStudents,
    students,
  };

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

ContextFirst.propTypes = {
  children: PropTypes.node,
};
export default ContextFirst;
