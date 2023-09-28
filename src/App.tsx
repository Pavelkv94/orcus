import "./App.css";
import { Route, Routes } from "react-router-dom";
import "antd/dist/reset.css";
import { Empty, Layout } from "antd";
import { HeaderNavBar } from "./components/HeaderNavBar/HeaderNavBar";
import { MenuBar } from "./components/MenuBar/MenuBar";
import { MainWindow } from "./components/MainWindow/MainWindow";
import { Dispatch, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Login } from "./components/Login/Login";
import { Admin } from "./components/MainWindow/Admin/Admin";
import { useState } from "react";
import { Greeting } from "./components/MainWindow/Greeting/Greeting";
import { meTC } from "./redux/appReducer";
const { Header, Content, Sider } = Layout;

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch: Dispatch<any> = useDispatch();
  const [collapsed, setCollapse] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("user");
    dispatch(meTC(username));
  }, [dispatch]);

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
            <Routes>
              <Route element={<MainWindow />} path="/main/:id?" />
              <Route element={<Admin />} path="/admin" />

              <Route element={<Login />} path="/login" />
              <Route element={<Greeting />} path="/" />
              <Route element={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ height: "90vh" }} />} path="*" />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
