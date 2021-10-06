import { Layout, Menu, Breadcrumb } from 'antd';
import { state } from '../../state';
import { v1 } from 'uuid';
import { NavLink } from 'react-router-dom';




export function HeaderNavBar() {
    return (
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
  
        {state.map(w => <Menu.Item key={w.id} ><NavLink to={{ pathname: `/${w.title}` }} >{w.title}</NavLink></Menu.Item>)}
        <Menu.Item key={v1()} > <NavLink to={{ pathname: `/admin` }} > ADMIN</NavLink></Menu.Item>
      </Menu>
    )
  }