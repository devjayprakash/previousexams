import { useState } from 'react'
import { Layout, Menu } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import {
    ChevronLeft,
    ChevronRight,
    FileIcon,
    LayoutDashboard,
    University,
} from 'lucide-react'
import { Outlet, useNavigate } from 'react-router-dom'

const Dashboard: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()

    const centeredIcon = (icon: React.ReactNode) => {
        return (
            <div
                style={{ width: collapsed ? '100%' : 'auto' }}
                className="h-full flex justify-center items-center"
            >
                {icon}
            </div>
        )
    }

    return (
        <Layout className="w-full h-screen">
            <Header className="w-full bg-white flex justify-between border-gray-200 border-b">
                <div className="text-xl h-full flex items-center px-3 gap-2">
                    previousexams
                    <div className="bg-blue-500 text-white px-2 text-xs rounded-full">
                        admin
                    </div>
                </div>
            </Header>
            <Layout>
                <Sider
                    className="bg-slate-50 h-full"
                    collapsible
                    collapsed={collapsed}
                    trigger={null}
                >
                    <div className="h-full flex flex-col justify-between border-r border-gray-200">
                        <Menu
                            mode="inline"
                            className="bg-slate-50 mt-3"
                            theme="light"
                            defaultOpenKeys={['home']}
                            items={[
                                {
                                    key: 'home',
                                    icon: centeredIcon(<LayoutDashboard />),
                                    label: 'Home',
                                },
                                {
                                    key: 'universities',
                                    icon: centeredIcon(<University />),
                                    label: 'Universities',
                                    onClick: () => {
                                        navigate('/dashboard/university')
                                    },
                                },
                                {
                                    key: 'question_papers',
                                    icon: centeredIcon(<FileIcon />),
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
