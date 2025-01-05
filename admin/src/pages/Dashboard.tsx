import { useState } from 'react'
import { Button, Layout, Menu } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import {
    CircleChevronLeft,
    CircleChevronRight,
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
                    className="bg-slate-50"
                    collapsible
                    collapsed={collapsed}
                    trigger={null}
                >
                    <Menu
                        mode="inline"
                        className="h-full bg-slate-50 mt-3"
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
                </Sider>
                <Content className="p-2">
                    <Button
                        className="flex items-center justify-center"
                        type="text"
                        icon={
                            collapsed ? (
                                <CircleChevronRight />
                            ) : (
                                <CircleChevronLeft />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                    />
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default Dashboard
