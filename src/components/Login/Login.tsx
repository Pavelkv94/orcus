import { AppStateType } from "../../redux/store"
import s from "./Login.module.css"
import { useSelector } from 'react-redux';
import { Redirect } from "react-router";
import { Button } from 'antd';
import React from 'react';
import { setAppAuthAC } from '../../redux/appReducer';
import { useDispatch } from 'react-redux';

export const Login = React.memo(() => {
	const dispatch = useDispatch();
	const isAuth = useSelector<AppStateType, boolean>(state => state.app.isAuth);
	console.log(isAuth)

	const onFinish = () => {
		dispatch(setAppAuthAC(true))
	};

	// const onFinishFailed = (errorInfo: any) => {
	// 	console.log('Failed:', errorInfo);
	// };

	if (isAuth) {
		return <Redirect to={"/"} />
	} else {
		return (
			<div className={s.login}>

				{/* <Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				> */}
				{/* <Form.Item
					label="Username"
					name="username"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input />
				</Form.Item> */}

				{/* <Form.Item
						label="Password"
						name="password"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input.Password />
					</Form.Item> */}


				<Button type="primary" htmlType="submit" onClick={onFinish}>
					Submit
				</Button>

				{/* </Form> */}
			</div>
		)
	}
})