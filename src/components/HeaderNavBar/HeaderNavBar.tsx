import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { CategoryType } from '../../redux/categoriesReducer';
import { useDispatch } from 'react-redux';
import React from 'react';
import { NavLink } from 'react-router-dom';


export const HeaderNavBar = React.memo(() => {
	const dispatch = useDispatch();
	const categories = useSelector<AppStateType, Array<CategoryType>>(state => state.categories);
	
	return (
		<div>
			<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} className='menu' >
				{/* {categories.map(w => <Menu.Item key={w._id} onClick={() => dispatch(getFilterPostsTC(w.title))}>{w.title}</Menu.Item>)} */}
				<Menu.Item><NavLink to={{ pathname: `/admin` }} >ADMIN</NavLink></Menu.Item>
			</Menu>
		</div>
	)
})