import { Spin } from "antd"
import s from './App.module.css';

export const Preloader = () => {
	return (
		<div className={s.preloader}>
			<Spin tip="Loading..." size="large">
			</Spin>
		</div>
	)
}