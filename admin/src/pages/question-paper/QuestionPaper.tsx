import { Button, Card, Form, Input, Modal, Typography } from 'antd'
import { useState } from 'react'

const QuestionPaper: React.FC = () => {
    const [showCreateModal, setShowCreateModal] = useState(false)

    return (
        <>
            <Card>
                <Typography.Title level={3}>Question Paper</Typography.Title>
                <div className="flex justify-end">
                    <Button type="primary">Create Question Paper</Button>
                </div>
            </Card>
            <Modal
                title={'Create Question Paper'}
                open={showCreateModal}
                onCancel={() => {
                    setShowCreateModal(false)
                }}
            >
                <Form>
                    <Form.Item name={'name'} label={'Name'}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={'courseId'} label={'Course'}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default QuestionPaper
