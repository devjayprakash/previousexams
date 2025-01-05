import { Button } from 'antd'

export const universitiesTableColumn = [
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
        render: () => (
            <div className="flex gap-2">
                <Button type="primary">Show details</Button>
            </div>
        ),
    },
]
