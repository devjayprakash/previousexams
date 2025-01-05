import { useState } from 'react'
import { Button, Layout, Menu } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import {
    ChevronLeft,
    ChevronRight,
    FileIcon,
    House,
    University,
} from 'lucide-react'
import { Outlet, useNavigate } from 'react-router-dom'

const Dashboard: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()

    return (
        <Layout className="w-full h-screen">
            <Header className="w-full bg-white flex justify-between">
                <div className="text-xl h-full flex items-center px-3">
                    previousexams
                </div>
            </Header>
            <Layout>
                <Sider
                    className="bg-slate-50 h-full"
                    collapsible
                    collapsed={collapsed}
                    trigger={null}
                >
                    <div className="h-full flex flex-col justify-between">
                        <Menu
                            mode="inline"
                            className="bg-slate-50 mt-3"
                            theme="light"
                            defaultOpenKeys={['home']}
                            items={[
                                {
                                    key: 'home',
                                    icon: <House />,
                                    label: 'Home',
                                },
                                {
                                    key: 'universities',
                                    icon: <University />,
                                    label: 'Universities',
                                    onClick: () => {
                                        navigate('/dashboard/university')
                                    },
                                },
                                {
                                    key: 'question_papers',
                                    icon: <FileIcon />,
                                    label: 'Question Papers',
                                },
                            ]}
                        />
                        <div
                            className="flex justify-center p-2 border border-gray-200 m-3 rounded-md cursor-pointer"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            {collapsed ? (
                                <ChevronRight size={16} />
                            ) : (
                                <ChevronLeft size={16} />
                            )}
                        </div>
                    </div>
                </Sider>
                <Content className="p-2">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default Dashboard
