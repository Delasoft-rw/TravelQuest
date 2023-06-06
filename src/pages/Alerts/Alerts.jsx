import React, { useState, useEffect } from 'react';
import List from '../../components/Table/List';
import { faker } from '@faker-js/faker';

function Receptionist() {
    const [currentTable, setCurrentTable] = useState('templates');
    const [addLabel, setAddLabel] = useState('Add Template');
    const [searchKey, setSearchKey] = useState('name');
    const [breadcrumbTitle, setBreadcrumbTitle] = useState('Message/Call templates');
    const [tableHead, setTableHead] = useState([]);

    const generateData = () => {
        const users = [];
        for (let i = 0; i < 10; i++) {
            const id = i + 1;
            const name = faker.helpers.arrayElement(['hourly','after every 30 minute']);
            const body = `Muraho {{name}}, Reminder for a flight today at 12:00PM. Thanks`;
            const time = faker.date.anytime();
            const doneBy = faker.helpers.arrayElement(['John Doe', 'Jane Doe']);

            const user = {
                id,
                name,
                body,
                time,
                doneBy
            };
            users.push(user);
        }
        return users;
    };

    useEffect(() => {
        if (currentTable === 'templates') {
            setSearchKey('name');
            setBreadcrumbTitle('Message/Call templates');
            setAddLabel('Add Template');
            setTableHead([
                { id: 'body', label: 'Body', alignRight: false },
                { id: 'timestamp', label: 'Time', alignRight: false },
                { id: 'doneBy', label: 'Done By', alignRight: false }
            ]);
        } else if (currentTable === 'call_types') {
            setSearchKey('name');
            setBreadcrumbTitle('Call Types');
            setAddLabel('Add new call type');
            setTableHead([
                { id: 'name', label: 'Name', alignRight: false },
                { id: 'doneBy', label: 'Done By', alignRight: false }
            ]);
        }
    }, [currentTable]);

    return (
        <>
            <List
                search_key={searchKey}
                add_label={addLabel}
                source_type="alert"
                breadcrumbTitle={breadcrumbTitle}
                table_data={generateData()}
                table_head={tableHead}
                onTableChange={(value) => setCurrentTable(value)}
                currentTable={currentTable}
            />
        </>
    );
}

export default Receptionist;
