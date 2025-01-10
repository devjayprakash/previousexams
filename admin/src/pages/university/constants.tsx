import { Button } from 'antd'
import { NavigateFunction } from 'react-router-dom'
import { University } from '../hooks/useUniversities'

export const universitiesTableColumn = (navigate: NavigateFunction) => [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'State',
        dataIndex: 'state',
        key: 'state',
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
    },
    {
        title: 'Pin code',
        dataIndex: 'pinCode',
        key: 'pinCode',
    },
    {
        title: 'Establishment year',
        dataIndex: 'establishmentYear',
        key: 'establishmentYear',
    },
    {
        title: 'Tier',
        dataIndex: 'tier',
        key: 'tier',
    },
    {
        title: 'Actions',
        render: (university: University) => (
            <div className="flex gap-2">
                <Button
                    type="primary"
                    onClick={() => {
                        navigate(`/dashboard/university/${university.id}`)
                    }}
                >
                    Show details
                </Button>
            </div>
        ),
    },
]

export const coursesTableColumn = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Semesters',
        dataIndex: 'semesters',
        key: 'semesters',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
]
