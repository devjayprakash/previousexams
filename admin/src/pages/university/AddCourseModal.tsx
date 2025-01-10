import { Modal, Alert, Input, Form } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import { useCreateCourse } from '../hooks/useCourses'

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    refetchCourses: any
    visible: boolean
    setVisible: (visible: boolean) => void
    universityId: string
}

const AddCourseModal: React.FC<Props> = ({
    refetchCourses,
    visible,
    setVisible,
    universityId,
}) => {
    const [form] = useForm()
    const {
        createCourse,
        isLoading: createCourseIsLoading,
        isError: createCourseIsError,
        error: createCourseError,
    } = useCreateCourse(universityId)

    return (
        <Modal
            open={visible}
            onClose={() => setVisible(false)}
            title={'Create course'}
            onCancel={() => setVisible(false)}
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
                        setVisible(false)
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
                <Form.Item name={'description'} required label="Description">
                    <TextArea></TextArea>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddCourseModal
