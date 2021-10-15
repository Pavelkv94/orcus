import { useParams } from "react-router";
import { NavLink } from 'react-router-dom';
import { Menu, Button } from 'antd';
import { v1 } from 'uuid';
import s from "./MenuBar.module.css"
import { RadarChartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { AppStateType } from "../../redux/store";
import { PostType } from "../../redux/postsReducer";
import SubMenu from "antd/lib/menu/SubMenu";

export function MenuBar() {
	const { catg } = useParams<{ catg: string }>();
	const posts = useSelector<AppStateType, Array<PostType>>(state => state.posts);
	const filterData = posts.filter((p: PostType) => p.category === catg).sort((a, b) => a.title > b.title ? 1 : -1)

	return (
		<div>
			<NavLink to={{ pathname: `/admin` }} ><Button shape='circle' size='large' style={{ marginLeft: '20px' }} icon={<RadarChartOutlined />}></Button></NavLink>
			<Menu
				className={s.menuLeft}
				theme="dark"
				mode="inline"
				defaultSelectedKeys={['1']}
				style={filterData.length !== null ? { height: '100%', borderRight: 0 } : { display: "none" }}
			>
				<SubMenu title={catg}>
					{filterData.length !== null && filterData.map((p: PostType) => <Menu.Item key={p._id} ><NavLink to={{ pathname: `/${catg}/${p.slug}` }} >{p.title}</NavLink></Menu.Item>)}
				</SubMenu>
			</Menu>
		</div>
	)
}