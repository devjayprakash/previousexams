import { Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { FileIcon, House, University } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout className="w-full h-screen">
      <Header className="w-full bg-white flex justify-between">
        <div className="text-xl h-full flex items-center px-3">
          previousexams
        </div>
      </Header>
      <Layout>
        <Sider className="bg-slate-50">
          <Menu
            className="h-full bg-slate-50  mt-3"
            theme="light"
            defaultOpenKeys={["home"]}
            items={[
              {
                key: "home",
                icon: <House />,
                label: "Home",
              },
              {
                key: "universities",
                icon: <University />,
                label: "Universities",
                onClick: () => {
                  navigate("/dashboard/university");
                },
              },
              {
                key: "question_papers",
                icon: <FileIcon />,
                label: "Question Papers",
              },
            ]}
          />
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
