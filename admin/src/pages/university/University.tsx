import { Alert, Button, Table } from 'antd'
import { University } from 'lucide-react'
import { useState } from 'react'
import AddUniversityModal from './AddUniversityModal'
import { universitiesTableColumn } from './constants'
import { useUniversities } from '../../hooks/useUniversities'
import { useNavigate } from 'react-router-dom'

const UniversityPage: React.FC = () => {
    const { universities, universityError, universityLoading } =
        useUniversities()
    const [showCreateUniversityModal, setShowCreateUniversityModal] =
        useState(false)
    const navigate = useNavigate()

    return (
        <div className="p-3">
            <div className="flex items-center gap-2">
                <University />
                <div className="text-2xl">Universities</div>
            </div>

            <div className="w-full mt-3 bg-white justify-between flex p-2 rounded-md">
                <div></div>
                <Button
                    onClick={() => setShowCreateUniversityModal(true)}
                    type="primary"
                    size="small"
                >
                    Create university
                </Button>
            </div>

            {(universityError as Error) && (
                <Alert
                    message={
                        (universityError as Error).message ||
                        'Error fetching universities'
                    }
                    type="error"
                    showIcon
                    closable
                />
            )}

            {universityLoading && (
                <Alert
                    style={{ marginTop: '20px' }}
                    message="Loading..."
                    type="info"
                />
            )}

            <Table
                className="mt-3"
                columns={universitiesTableColumn(navigate)}
                dataSource={universities}
            />

            <AddUniversityModal
                setShowCreateUniversityModal={setShowCreateUniversityModal}
                showCreateUniversityModal={showCreateUniversityModal}
            />
        </div>
    )
}

export default UniversityPage
