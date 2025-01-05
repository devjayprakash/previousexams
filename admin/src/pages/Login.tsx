import { Alert, Button, Card, Form, Input } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useState } from 'react'
import api from '../utils/axios'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginPage: React.FC = () => {
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const onFinish = async (values: { email: string; password: string }) => {
        try {
            const result = await api.post('/admin/sign_in', values)
            const token = result.data.token
            navigate('/dashboard')
            if (token) {
                localStorage.setItem('token', token)
            } else {
                setError('An error occurred')
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                const data = error.response?.data
                if (data) {
                    setError(data.msg)
                } else {
                    setError('An error occurred')
                }
            } else {
                console.error(error)
            }
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-slate-100">
            <div className="fixed top-0 left-0 right-0   p-5 bg-white">
                <div>
                    <div className="text-xl font-bold container mx-auto text-teal-500">
                        previousexams
                    </div>
                </div>
            </div>
            <Card className="min-w-[400px]">
                <div className="text-2xl mb-4 font-bold">Login as admin</div>
                {error && (
                    <Alert type="error" className="mb-3" message={error} />
                )}
                <Form onFinish={onFinish} layout="vertical">
                    <FormItem name={'email'} required label={'Username'}>
                        <Input type="email" />
                    </FormItem>
                    <FormItem name={'password'} required label={'Password'}>
                        <Input type="password" />
                    </FormItem>
                    <div className="flex justify-end">
                        <Button htmlType="submit" type="primary">
                            Login
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    )
}

export default LoginPage
