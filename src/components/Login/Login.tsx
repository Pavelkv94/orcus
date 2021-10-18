import { AppStateType } from "../../redux/store"
import s from "./Login.module.css"
import { useSelector } from 'react-redux';
import { Redirect } from "react-router";
import { Form, Input, Button } from 'antd';
import React, { useState } from 'react';

export const Login = React.memo(() => {

	const isAuth = useSelector<AppStateType, boolean>(state => state.app.isAuth);
	const [auth, setAuth] = useState(isAuth);
	if (auth) {
		return <Redirect to={"/admin"} />
	}
	const onFinish = (values: any) => {
		console.log('Success:', values);
		setAuth(true)
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<div className={s.login}>

			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Username"
					name="username"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
})