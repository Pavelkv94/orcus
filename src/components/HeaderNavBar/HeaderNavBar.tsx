import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import s from "./HeaderNavBar.module.css";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/store";

export const HeaderNavBar = React.memo(() => {
  const navigate = useNavigate();

  const roles = useSelector<AppStateType, string[]>((state) => state.app.user.roles);
  const username = useSelector<AppStateType, string>((state) => state.app.user.username);

  const exit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    navigate("/login");
  };

  return (
    <div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]} className={s.menu}>
        <Menu.Item style={{ position: "absolute", right: "10px" }} onClick={exit}>
          <LogoutOutlined style={{ marginRight: "10px" }} />
          LOGOUT
        </Menu.Item>
        <Menu.Item>
          <NavLink to={{ pathname: `/` }}>Main</NavLink>
        </Menu.Item>
        <div style={{ position: "absolute", right: "140px", width: "300px" }} className={s.username}>
          <Avatar style={{ marginRight: "10px" }} icon={<UserOutlined />} />
          {username}
        </div>
        {roles?.includes("Admin") && (
          <Menu.Item>
            <NavLink to={{ pathname: `/admin` }}>ADMIN</NavLink>
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
});
