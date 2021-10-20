import './App.module.css';
import 'antd/dist/antd.css';
import { Route, Switch } from 'react-router-dom';
import { Empty, Layout } from 'antd';
import { HeaderNavBar } from './components/HeaderNavBar/HeaderNavBar';
import { MenuBar } from './components/MenuBar/MenuBar';
import { MainWindow } from './components/MainWindow/MainWindow';
import { useEffect } from 'react';
import { getCategoriesTC } from './redux/categoriesReducer';
import { useDispatch } from 'react-redux';
import { Login } from './components/Login/Login';
import { Admin } from './components/MainWindow/Admin/Admin';
import { getPostsTC } from './redux/postsReducer';
import { useState } from 'react';
const { Header, Content, Sider } = Layout;


function App() {
	const dispatch = useDispatch();
	const [collapsed, setCollapse] = useState(false);

	useEffect(() => {
		dispatch(getCategoriesTC())
	}, [dispatch]);


	useEffect(() => {
		dispatch(getPostsTC())
	}, [dispatch]);

	return (

		<Layout>
			<Header>
				<HeaderNavBar />
			</Header>
			<Layout >
				<Sider width={200} className="site-layout-background" collapsed={collapsed}  collapsible onCollapse={() => setCollapse(!collapsed)}>
					<MenuBar />

				</Sider>
				<Layout style={{ padding: '0 24px 24px' }}>

					<Content
						className="site-layout-background"
						style={{
							padding: 24,
							margin: 0,
							minHeight: 280,
						}}
					>
						<Switch>
							<Route exact path="/main/:id?" render={() => <MainWindow />} />
							<Route exact path="/admin" render={() => <Admin />} />
							<Route render={() => <Login />} path="/login" />
							<Route render={() => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ height: "90vh" }} />} path="*" />

						</Switch>
					</Content>
				</Layout>
			</Layout>
		</Layout>

	);
}

export default App;
