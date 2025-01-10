import { useSingleUniversity } from '../../hooks/useUniversities'
import { useParams } from 'react-router-dom'
import {
    Alert,
    Button,
    Card,
    Descriptions,
    Form,
    Input,
    Modal,
    Table,
} from 'antd'
import { University as UniversityIcon } from 'lucide-react'
import Loading from '../../../components/Loading'
import { useCourses, useCreateCourse } from '../../hooks/useCourses'
import { useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { useForm } from 'antd/es/form/Form'
import { coursesTableColumn } from '../constants'

const UniversityDetails: React.FC = () => {
    const { university_id } = useParams()

    const [createCourseModalVisible, setCreateCourseModalVisible] =
        useState(false)

    const [form] = useForm()

    const { data, isLoading, error } = useSingleUniversity(university_id || '')
    const { coursesLoading, refetchCourses, courses } = useCourses(
        university_id || ''
    )
    const {
        createCourse,
        isLoading: createCourseIsLoading,
        isError: createCourseIsError,
        error: createCourseError,
    } = useCreateCourse(university_id || '')

    if (error) {
        return 'There was an error fetching the data'
    }

    return (
        <div>
            <Card>
                <div className="flex items-center gap-2">
                    <UniversityIcon />
                    <h1 className="text-2xl font-semibold">{data?.name}</h1>
                </div>
                {isLoading && <Loading text="Loading please wait" />}
                <Descriptions bordered className="mt-3">
                    <Descriptions.Item label={'State'}>
                        {data?.state}
                    </Descriptions.Item>
                    <Descriptions.Item label={'State'}>
                        {data?.country}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Pin code'}>
                        {data?.pinCode}
                    </Descriptions.Item>
                    <Descriptions.Item label={'Foundation year'}>
                        {data?.establishmentYear}
                    </Descriptions.Item>
                </Descriptions>
                <div className="flex justify-between items-center my-3">
                    <h2 className="text-xl mt-3">Courses</h2>
                    <Button
                        type="primary"
                        onClick={() => setCreateCourseModalVisible(true)}
                    >
                        Create course
                    </Button>
                </div>

                {coursesLoading && <Loading text="Loading courses" />}

                <Table columns={coursesTableColumn} dataSource={courses} />
            </Card>
            <Modal
                open={createCourseModalVisible}
                onClose={() => setCreateCourseModalVisible(false)}
                title={'Create course'}
                onOk={() => {
                    form.submit()
                }}
                okButtonProps={{
                    loading: createCourseIsLoading,
                }}
                okText="Create"
            >
                {createCourseIsError && (
                    <Alert
                        type="error"
                        className="my-3"
                        message={(createCourseError as Error).message}
                    />
                )}
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={async (values) => {
                        try {
                            await createCourse({
                                ...values,
                                semesters: parseInt(values.semesters),
                            })
                            await refetchCourses()
                            form.resetFields()
                            setCreateCourseModalVisible(false)
                        } catch (error) {
                            console.error(error)
                        }
                    }}
                >
                    <Form.Item name={'name'} required label="Name">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item name={'semesters'} required label="Semesters">
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name={'description'}
                        required
                        label="Description"
                    >
                        <TextArea></TextArea>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default UniversityDetails
