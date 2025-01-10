import { Button, Card, Table } from 'antd'
import Loading from '../../components/Loading'
import AddCourseModal from '../university/AddCourseModal'
import { coursesTableColumn } from '../university/constants'
import { useState } from 'react'
import { useCourses } from '../../hooks/useCourses'

type Props = {
    university_id: string
}

const Courses: React.FC<Props> = ({ university_id }) => {
    const [createCourseModalVisible, setCreateCourseModalVisible] =
        useState(false)

    const { coursesLoading, refetchCourses, courses } = useCourses(
        university_id || ''
    )

    return (
        <Card>
            <div>
                <div className="flex justify-between items-center my-3">
                    <Button
                        type="primary"
                        onClick={() => setCreateCourseModalVisible(true)}
                    >
                        Create course
                    </Button>
                </div>

                {coursesLoading && <Loading text="Loading courses" />}
                <Table columns={coursesTableColumn} dataSource={courses} />
                <AddCourseModal
                    visible={createCourseModalVisible}
                    setVisible={setCreateCourseModalVisible}
                    universityId={university_id || ''}
                    refetchCourses={refetchCourses}
                />
            </div>
        </Card>
    )
}

export default Courses
