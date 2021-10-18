import { NavLink } from 'react-router-dom';
import { Menu, Button } from 'antd';
import s from "./MenuBar.module.css"
import { DingtalkOutlined, RadarChartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { AppStateType } from "../../redux/store";
import { PostType } from "../../redux/postsReducer";
import SubMenu from "antd/lib/menu/SubMenu";
import { v1 } from "uuid";
import { useDispatch } from 'react-redux';
import { getPostTC } from '../../redux/filterReducer';
import React from 'react';

export const MenuBar = React.memo(() => {
	const dispatch = useDispatch();
	const posts = useSelector<AppStateType, Array<PostType>>(state => state.filter.filterPosts);

	return (
		<div>
			<NavLink to={{ pathname: `/admin` }} ><Button shape='circle' size='large' style={{ margin: '10px 80px' }} icon={<RadarChartOutlined />}></Button></NavLink>
			<Menu
				className={s.menuLeft}
				theme="dark"
				mode="inline"
				defaultSelectedKeys={['1']}
				style={posts.length !== null ? { height: '100%', borderRight: 0 } : { display: "none" }}
			>
				<SubMenu key={v1()} icon={<DingtalkOutlined />} title={posts[0]?.category}>
					{posts.length !== null && posts.map((p: PostType) => <Menu.Item key={p._id} onClick={() => dispatch(getPostTC(p._id))}><NavLink to={`/main/${p._id}`}> {p.title}</NavLink></Menu.Item>)}
				</SubMenu>
			</Menu>
		</div>
	)
})