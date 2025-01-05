import { Form, Input, Select } from 'antd'
import FormItem from 'antd/es/form/FormItem'

const { Option } = Select

const HomePageHeader: React.FC = () => {
    const universities = ['Mit ', 'IIT kharagpur', 'UANL', 'TEC', 'UCNL']
    return (
        <div className="w-full h-full bg-slate-100 rounded-md p-5">
            <h1 className="text-3xl text-center">
                Get your previous exams papers in one click
            </h1>
            <Form layout="vertical">
                <FormItem label={'University'}>
                    <Select placeholder={'Search your university'} allowClear>
                        {universities.map((name) => (
                            <Option value={name}>{name}</Option>
                        ))}
                    </Select>
                </FormItem>
                <FormItem label={'Course'}>
                    <Input />
                </FormItem>
                <FormItem label={'Semester'}>
                    <Input />
                </FormItem>
                {/* jayprkshpthk@gmail.com */}
            </Form>
        </div>
    )
}

export default HomePageHeader
