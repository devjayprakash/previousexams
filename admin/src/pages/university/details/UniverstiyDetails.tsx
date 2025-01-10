import { useParams } from 'react-router-dom'
import { Card, Descriptions, Tabs } from 'antd'
import { University as UniversityIcon } from 'lucide-react'
import Loading from '../../../components/Loading'
import QuestionPaper from '../../question-paper/QuestionPaper'
import Courses from '../../courses/Courses'
import { useSingleUniversity } from '../../../hooks/useUniversities'

const UniversityDetails: React.FC = () => {
    const { university_id } = useParams()
    const { data, isLoading } = useSingleUniversity(university_id || '')
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

                <Tabs
                    className="my-3"
                    defaultActiveKey="courses"
                    items={[
                        {
                            label: 'Courses',
                            children: (
                                <Courses university_id={university_id || ''} />
                            ),
                            id: 'courses',
                            key: 'courses',
                        },
                        {
                            label: 'Question Papers',
                            children: <QuestionPaper />,
                            key: 'question-papers',
                        },
                    ]}
                />
            </Card>
        </div>
    )
}

export default UniversityDetails
