import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { CategoryType } from '../../redux/categoriesReducer';

export function HeaderNavBar() {
	const categories = useSelector<AppStateType, Array<CategoryType>>(state => state.categories);

	return (
		<div>
			<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} className='menu' >
				{categories.map(w => <Menu.Item key={w._id} ><NavLink to={{ pathname: `/${w.title}` }} >{w.title}</NavLink></Menu.Item>)}
			</Menu>
		</div>
	)
}