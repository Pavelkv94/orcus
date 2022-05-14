import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import s from "./HeaderNavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../redux/store";
import { logoutAC } from "../../redux/appReducer";

export const HeaderNavBar = React.memo(() => {
    const dispatch = useDispatch();
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
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["0"]}
                className={s.menu}
            >
                <Menu.Item
                    style={{ position: "absolute", right: "10px" }}
                    onClick={exit}
                >
                    <LogoutOutlined style={{marginRight: '10px'}} />LOGOUT
                </Menu.Item>
                <Menu.Item>
                    <NavLink to={{ pathname: `/` }}>Main</NavLink>
                </Menu.Item>
                <Menu.Item style={{ position: "absolute", right: "140px", width: '170px' }} disabled className={s.username}> <Avatar style={{marginRight: '10px'}} icon={<UserOutlined />} />{username}</Menu.Item>
                {role === "admin" && 
                    <Menu.Item>
                        <NavLink to={{ pathname: `/admin` }}>ADMIN</NavLink>
                    </Menu.Item>
                }
            </Menu>
        </div>
    );
});
