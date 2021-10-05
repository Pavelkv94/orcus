import React, { useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { HashRouter, Route, withRouter, Switch, NavLink, BrowserRouter, useParams } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { state } from './state';
import { v1 } from 'uuid';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


function App() {

  return (
    <HashRouter>
      <Layout>

        <Header className="header">

          <HeaderNavBar />
        </Header>
        <Layout >
          <Sider width={200} className="site-layout-background"  >
            <Switch>
              <Route exact path="/:catg/:slug?" render={() => <MenuBar />
              } />
            </Switch>

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
                <Route exact path="/:catg/:slug" render={() => <Article />
                } />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </HashRouter>
  );
}

export default App;


function MenuBar() {
  const { catg } = useParams<{ catg: string }>();
  console.log(`CATEGORY ITEM--> ${catg} `)
  let count:number | null = 0;
  switch (catg) {
    case "Linux": count = 0; break;
    case "Windows": count = 1; break;
    case "admin":  count = null; break;
    default: count = 0
  }

  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={['1']}

      style={count !== null ?{ height: '100%', borderRight: 0 }: {display:"none"}}
    >

      {count !== null && state[count].articles.map(p => <Menu.Item key={v1()} ><NavLink to={{ pathname: `/${catg}/${p.shotTitle}` }} >{p.shotTitle}</NavLink></Menu.Item>)}


    </Menu>
  )
}
function HeaderNavBar() {
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
     
      {state.map(w => <Menu.Item key={w.id} ><NavLink to={{ pathname: `/${w.title}` }} >{w.title}</NavLink></Menu.Item>)}
      <Menu.Item key={v1()} > <NavLink to={{ pathname: `/admin` }} > ADMIN</NavLink></Menu.Item>
    </Menu>
  )
}
function Article() {
  const { slug, catg } = useParams<{ catg: string, slug: string }>();
  console.log(`CATEGORY--> ${catg} SLUG-->${slug}`)
  return (
    <>{slug}</>
  )
}