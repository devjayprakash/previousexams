import { Modal, Input, Form, Select } from 'antd'
import { useParams } from 'react-router-dom'
import { useCourses } from '../../hooks/useCourses'

type Props = {
    showCreateModal: boolean
    setShowCreateModal: (show: boolean) => void
}

const CreateQuestionPaperModal: React.FC<Props> = ({
    showCreateModal,
    setShowCreateModal,
}) => {
    const { university_id } = useParams()

    const { courses, coursesLoading } = useCourses(university_id || '')

    return (
        <Modal
            title={'Create Question Paper'}
            open={showCreateModal}
            onCancel={() => {
                setShowCreateModal(false)
            }}
        >
            <Form layout="vertical">
                <Form.Item name={'name'} label={'Name'}>
                    <Input />
                </Form.Item>
                {coursesLoading ? (
                    'Loading ... '
                ) : (
                    <Form.Item name={'courseId'} label={'Course'}>
                        <Select>
                            {courses &&
                                courses.map((course) => (
                                    <Select.Option
                                        key={course.createdAt}
                                        value={course.createdAt}
                                    >
                                        {course.name}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                )}
                <Form.Item
                    label={'Upload Question Paper'}
                    name={'questionPaper'}
                >
                    <Input type="file" />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateQuestionPaperModal
