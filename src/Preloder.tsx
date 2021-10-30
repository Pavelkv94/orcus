import { Spin } from "antd"
import './App.module.css';

export const Preloader = () => {
	return (
		<div className='preloader'>
			<Spin tip="Loading..." size="large">
			</Spin>
		</div>
	)
}