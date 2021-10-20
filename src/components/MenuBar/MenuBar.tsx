import { NavLink } from 'react-router-dom';
import { Menu, Button } from 'antd';
import s from "./MenuBar.module.css"
import { DingtalkOutlined, RadarChartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { AppStateType } from "../../redux/store";
import { PostType } from "../../redux/postsReducer";
import SubMenu from "antd/lib/menu/SubMenu";
import { useDispatch } from 'react-redux';
import { getPostTC } from '../../redux/filterReducer';
import React from 'react';
import { CategoryType } from '../../redux/categoriesReducer';

export const MenuBar = React.memo(() => {
	const dispatch = useDispatch();
	const posts = useSelector<AppStateType, Array<PostType>>(state => state.posts);
	const categories = useSelector<AppStateType, Array<CategoryType>>(state => state.categories);

	return (
		<div>
			<Menu
				className={s.menuBar}
				theme="dark"
				mode="inline"
				defaultSelectedKeys={['1']}
				style={posts.length !== null ? { height: '100%', width: "200px" } : { display: "none" }}
			>

				{categories?.map(c =>
					<SubMenu key={c._id} icon={<DingtalkOutlined />} title={c.title} >
						{posts?.map(p => p.category === c.title && <Menu.Item key={p._id} onClick={() => dispatch(getPostTC(p._id))}><NavLink to={`/main/${p._id}`}> {p.title}</NavLink> </Menu.Item>)}

					</SubMenu>)}
			</Menu>
		</div>
	)
})