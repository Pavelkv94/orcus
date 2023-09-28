import { AppStateType } from "../../redux/store";
import s from "./Login.module.css";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import {
    Button,
    Form,
    Input,
    message,
    Modal,
    Statistic,
} from "antd";
import React, { Dispatch, MouseEventHandler, useEffect, useState } from "react";
import {
    loginTC,
    registrationTC,
    RequestStatusType,
} from "../../redux/appReducer";
import { useDispatch } from "react-redux";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";

export type CredentialsType = {
    username: string;
    password: string;
};

export const Login = React.memo(() => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch: Dispatch<any> = useDispatch();

    const initialRegData = { username: "", password: "" };
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [regData, setRegData] = useState(initialRegData);
    const info = useSelector<AppStateType, string | null>(
        (state) => state.app.info
    );
    const error = useSelector<AppStateType, string | null>(
        (state) => state.app.error
    );
    const status = useSelector<AppStateType, RequestStatusType>(
        (state) => state.app.status
    );

    const errorMessage = (err: string) => {
        message.error(err);
    };

    useEffect(() => {
        error !== null && error !== undefined && errorMessage(error);
    }, [error]);

    const infoMessage = (info: string) => {
        message.success(info);
    };

    useEffect(() => {
        info !== null && info !== undefined && info !== '' && infoMessage(info);
    }, [info]);

    const isAuth = useSelector<AppStateType, boolean>(
        (state) => state.app.isAuth
    );

    const onFinish = (values: MouseEventHandler<HTMLElement>) => {
        if (Object.keys(values).includes("username")) {
            dispatch(loginTC(values));
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

    if (isAuth && status === "succeeded") {
        return <Navigate to={"/"} />;
    } else {
        return (
            <div className={s.login}>
                <div className={s.default} style={{margin: '0 140px 0 0'}}>
                    <Statistic
                        title="Default Username"
                        value={"user"}
                        prefix={<UserOutlined />}
                    />
                    <Statistic title="Default Password" value={"user"}   prefix={<KeyOutlined />}/>
                </div>
                <br />
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    style={{margin: '0 200px 200px 0'}}
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
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={onFinish}
                        >
                            Sign In
                        </Button>
                        <Button type="primary" onClick={showModal}>
                            Sign Up
                        </Button>
                    </div>
                </Form>
                <Modal
                    title="New User Registration"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="cancel" onClick={handleCancel}>
                            Close
                        </Button>,
                        <Button
                            key="ok"
                            onClick={handleOk}
                            type="primary"
                            disabled={!regData.password || !regData.username}
                        >
                            Sign Up
                        </Button>,
                    ]}
                >
                    <div className={s.registerField}>
                        <p>First name:</p>
                        <Input />
                    </div>
                    <div className={s.registerField}>
                        <p>Surname:</p>
                        <Input />
                    </div>
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
            </div>
        );
    }
});
