import { Menu } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './HeaderNavBar.module.css'

export const HeaderNavBar = React.memo(() => {

	return (
		<div>
			<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className={s.menu} >
				<Menu.Item><NavLink to={{ pathname: `/admin` }} >ADMIN</NavLink></Menu.Item>
			</Menu>
		</div>
	)
})