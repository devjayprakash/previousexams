import { Button, Card, Typography } from 'antd'
import { useState } from 'react'
import CreateQuestionPaperModal from './CreateQuestionPaperModal'

const QuestionPaper: React.FC = () => {
    const [showCreateModal, setShowCreateModal] = useState(false)

    return (
        <>
            <Card>
                <Typography.Title level={3}>Question Paper</Typography.Title>
                <div className="flex justify-end">
                    <Button
                        onClick={() => {
                            setShowCreateModal(true)
                        }}
                        type="primary"
                    >
                        Create Question Paper
                    </Button>
                </div>
            </Card>
            <CreateQuestionPaperModal
                showCreateModal={showCreateModal}
                setShowCreateModal={setShowCreateModal}
            />
        </>
    )
}

export default QuestionPaper
