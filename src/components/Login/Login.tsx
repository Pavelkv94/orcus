import s from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router";
import { Button, Form, Input, message, Modal, Statistic } from "antd";
import React, { MouseEventHandler, useState } from "react";
import { loginTC, registrationTC } from "../../redux/appReducer";
import { useDispatch } from "react-redux";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { AppDispatch } from "../../redux/store";

export type CredentialsType = {
  username: string;
  password: string;
};

export const Login = React.memo(() => {
  const dispatch: AppDispatch = useDispatch();

  const initialRegData = { username: "", password: "" };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [regData, setRegData] = useState(initialRegData);
  const navigate = useNavigate();

  const onFinish = async (values: CredentialsType) => {
    if (values.username) {
      try {
        await dispatch(loginTC(values)); // Ensure loginTC returns a promise
        navigate("/"); // Redirect to the home page after successful login
      } catch (error) {
        // Handle any errors if loginTC uses a rejected promise
        message.error("Login failed. Please check your credentials.");
      }
    }
  };

  //@ts-ignore
  const onFinishFailed = (errorInfo: ValidateErrorEntity<MouseEventHandler<HTMLElement>>) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    dispatch(registrationTC(regData));
    setRegData(initialRegData);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <div className={s.login}>
      <div className={s.creds}>
        <div className={s.default} style={{ margin: "0 140px 0 0" }}>
          <Statistic title="Default Username" value={"user"} prefix={<UserOutlined />} />
          <Statistic title="Default Password" value={"user"} prefix={<KeyOutlined />} />
        </div>
        <br />
        <div className={s.default} style={{ margin: "0 140px 0 0" }}>
          <Statistic title="Admin Username" value={"admin"} prefix={<UserOutlined />} />
          <Statistic title="Admin Password" value={"admin"} prefix={<KeyOutlined />} />
        </div>
        <br />
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ margin: "0 200px 200px 0" }}
      >
        <Form.Item
          className={s.field}
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} />
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
          <Input.Password />
        </Form.Item>
        <div className={s.loginActions}>
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
          <Button type="primary" onClick={showModal}>
            Sign Up
          </Button>
        </div>
      </Form>
      {isModalVisible && (
        <Modal
          title="New User Registration"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Close
            </Button>,
            <Button key="ok" onClick={handleOk} type="primary" disabled={!regData.password || !regData.username}>
              Sign Up
            </Button>,
          ]}
        >
          <div className={s.registerField}>
            <p>Login name:</p>
            <Input
              value={regData.username}
              onChange={(e) =>
                setRegData({
                  ...regData,
                  username: e.currentTarget.value,
                })
              }
            />
          </div>
          <div className={s.registerField}>
            <p>Password</p>
            <Input.Password
              value={regData.password}
              onChange={(e) =>
                setRegData({
                  ...regData,
                  password: e.currentTarget.value,
                })
              }
            />
          </div>
        </Modal>
      )}
    </div>
  );
});
