import { Spin } from "antd"
import './App.css';

export const Preloader = () => {
	return (
		<div className='preloader'>
			<Spin tip="Loading..." size="large">
			</Spin>
		</div>
	)
}