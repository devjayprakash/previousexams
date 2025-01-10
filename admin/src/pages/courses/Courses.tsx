import { Button, Table } from 'antd'
import Loading from '../../components/Loading'
import AddCourseModal from '../university/AddCourseModal'
import { coursesTableColumn } from '../university/constants'
import { useCourses } from '../hooks/useCourses'
import { useState } from 'react'

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
        <div>
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
        </div>
    )
}

export default Courses
