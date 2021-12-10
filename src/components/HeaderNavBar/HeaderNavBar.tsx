import { LogoutOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './HeaderNavBar.module.css'
import { useDispatch } from 'react-redux';
import { setAppAuthAC } from '../../redux/appReducer';


export const HeaderNavBar = React.memo(() => {
	const dispatch = useDispatch();
	const exit = () => { dispatch(setAppAuthAC(false)) }

	return (
		<div>
			<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className={s.menu} >
				<Menu.Item style={{ position: 'absolute', right: '10px' }} onClick={exit}><LogoutOutlined /></Menu.Item>
				<Menu.Item><NavLink to={{ pathname: `/` }} >Main</NavLink></Menu.Item>
				<Menu.Item><NavLink to={{ pathname: `/admin` }} >ADMIN</NavLink></Menu.Item>
				</Menu>
		</div>
	)
})