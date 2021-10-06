import { useParams } from "react-router";
import { state } from '../../state';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { v1 } from 'uuid';



export function MenuBar() {
    const { catg } = useParams<{ catg: string }>();
    // console.log(`CATEGORY ITEM--> ${catg} `)
    let count: number | null = 0;
    switch (catg) {
      case "Linux": count = 0; break;
      case "Windows": count = 1; break;
      case "admin": count = null; break;
      default: count = 0
    }
  
    return (
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
  
        style={count !== null ? { height: '100%', borderRight: 0 } : { display: "none" }}
      >
  
        {count !== null && state[count].articles.map(p => <Menu.Item key={v1()} ><NavLink to={{ pathname: `/${catg}/${p.shotTitle}` }} >{p.shotTitle}</NavLink></Menu.Item>)}
  
  
      </Menu>
    )
  }