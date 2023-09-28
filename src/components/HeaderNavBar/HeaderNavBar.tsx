import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import React, { Dispatch } from "react";
import { NavLink } from "react-router-dom";
import s from "./HeaderNavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../redux/store";
import { logoutAC } from "../../redux/appReducer";

export const HeaderNavBar = React.memo(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch: Dispatch<any> = useDispatch();

  const role = useSelector<AppStateType, string>((state) => state.app.role);
  const username = useSelector<AppStateType, string>((state) => state.app.user.username);

  const exit = () => {
    dispatch(logoutAC());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
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
        <div style={{ position: "absolute", right: "140px", width: "170px" }} className={s.username}>
          <Avatar style={{ marginRight: "10px" }} icon={<UserOutlined />} />
          {username}
        </div>
        {role === "admin" && (
          <Menu.Item>
            <NavLink to={{ pathname: `/admin` }}>ADMIN</NavLink>
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
});
