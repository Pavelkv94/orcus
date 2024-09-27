import React, { Suspense, useEffect, useState } from "react";
import { Empty, Layout, Spin, Typography } from "antd";
import { HeaderNavBar } from "./components/HeaderNavBar/HeaderNavBar";
import { MenuBar } from "./components/MenuBar/MenuBar";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMeTC } from "./redux/appReducer";
import { getCategoriesTC } from "./redux/categoriesReducer";
import { getShortPostsTC } from "./redux/postsReducer";
import { useSelector } from "react-redux";
import { AppDispatch, AppStateType } from "./redux/store";

const { Header, Content, Sider } = Layout;

const MainWindow = React.lazy(() => import("./components/MainWindow/MainWindow"));
const Greeting = React.lazy(() => import("./components/MainWindow/Greeting/Greeting"));
const Admin = React.lazy(() => import("./components/MainWindow/Admin/Admin"));

type ModeType = "main" | "greeting" | "admin";

type WrapperPropsType = {
  mode: ModeType;
};

const Wrapper = ({ mode }: WrapperPropsType) => {
  const dispatch: AppDispatch = useDispatch();
  const [collapsed, setCollapse] = useState(false);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const roles = useSelector<AppStateType, string[]>((state) => state.app.user.roles);

  const currentWindow = (mode: ModeType) => {
    switch (mode) {
      case "main":
        return <MainWindow />;
      case "admin":
        return roles?.includes("Admin") ? (
          <Admin />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} style={{ height: "90vh" }} description={<Typography.Text>Access Forbidden</Typography.Text>} />
        );
      case "greeting":
        return <Greeting />;
      default:
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ height: "90vh" }} />;
    }
  };

  useEffect(() => {
    dispatch(getMeTC(username));
  }, [dispatch, username]);

  useEffect(() => {
    token && dispatch(getCategoriesTC());
    token && dispatch(getShortPostsTC());
  }, [dispatch, token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Header>
        <HeaderNavBar />
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background" collapsed={collapsed} collapsible onCollapse={() => setCollapse(!collapsed)}>
          <MenuBar />
        </Sider>
        <Layout>
          <Content
            className="site-layout-background"
            style={{
              padding: 16,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Suspense
              fallback={
                <div style={{ height: "90vh" }}>
                  <Spin size="large" />
                </div>
              }
            >
              {currentWindow(mode)}
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Wrapper;
