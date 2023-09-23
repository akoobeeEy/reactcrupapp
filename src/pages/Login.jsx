import { useNavigate } from "react-router-dom";
import { Button, Input, Form, message } from "antd";
import axios from "axios";
import { KeyOutlined, MailOutlined } from '@ant-design/icons'
const Login = () => {
  const navigate = useNavigate();
  
  const onFinish = async (values) => {
    try {
      await axios.post("https://reqres.in/api/login", values);
      navigate("/dashboard");
    } catch (err) {
      message("Email or password is wrong");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen ">
      <Form
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
         <div className="flex px-2 rounded-md bg-slate-700">
         <MailOutlined  className="text-xl text-white"/>
         <Input className="all-input"/>
         </div>
        </Form.Item>

        <Form.Item
          label="Password" 
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <div className="flex px-2 rounded-md bg-slate-700">
          <KeyOutlined className="text-xl text-white"/>
          <Input.Password className="all-input" />
          </div>
        </Form.Item>

        <Form.Item style={{marginTop: "20px"}}
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button className="px-12 rounded-full"  htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
