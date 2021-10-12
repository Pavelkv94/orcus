import s from './App.module.css';
import 'antd/dist/antd.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Layout} from 'antd';
import { HeaderNavBar } from './components/HeaderNavBar/HeaderNavBar';
import { MenuBar } from './components/MenuBar/MenuBar';
import { MainWindow } from './components/MainWindow/MainWindow';


const { Header, Content, Sider } = Layout;


function App() {

  return (
    <HashRouter>
      <Layout>
        <Header>
          <HeaderNavBar />
        </Header>
        <Layout  className = {s.block}>
          <Sider width={200} className="site-layout-background" >
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
                <Route exact path="/:catg/:slug?" render={() => <MainWindow />
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
