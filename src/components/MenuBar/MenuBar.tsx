import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import s from "./MenuBar.module.css";
import { DingtalkOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/store";
import { ShortPostType } from "../../redux/postsReducer";
import SubMenu from "antd/lib/menu/SubMenu";
import React from "react";
import { CategoryType } from "../../redux/categoriesReducer";

export const MenuBar = React.memo(() => {
  const posts = useSelector<AppStateType, Array<ShortPostType>>((state) => state.posts.shortPosts);
  const categories = useSelector<AppStateType, Array<CategoryType>>((state) => state.categories);

  return (
    <div>
      <Menu className={s.menuBar} theme="dark" mode="inline" subMenuCloseDelay={2}>
        {categories?.map((c) => (
          <SubMenu key={Math.random()} icon={<DingtalkOutlined />} title={c.title}>
            {posts?.map(
              (p, index) =>
                p.category === c.title && (
                  <Menu.Item key={index}>
                    <NavLink to={`/main/${p._id}`}> {p.title}</NavLink>
                  </Menu.Item>
                )
            )}
          </SubMenu>
        ))}
      </Menu>
    </div>
  );
});
