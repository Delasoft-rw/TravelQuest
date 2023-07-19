import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import List from '../../components/Table/List';

function Planes() {
    const [currentTable, setCurrentTable] = useState('aeroplanes');
    const [addLabel, setAddLabel] = useState('Add Aeroplane');
    const [searchKey, setSearchKey] = useState('name');
    const [breadcrumbTitle, setBreadcrumbTitle] = useState('Supported Planes')
    const [tableHead, setTableHead] = useState([]);

    function generateAirplaneName() {
        const prefix = faker.commerce.productAdjective();
        const suffix = faker.commerce.productName();

        return `${prefix} ${suffix}`;
    }

    const generateData = () => {
        const data = [];
        for (let i = 0; i < 10; i++) {
            const id = i + 1;
            const name = generateAirplaneName();
            const company = faker.helpers.arrayElement(['RwandaAi', 'Quartar Airways']);
            const address = faker.helpers.arrayElement(['CHK 045 K', 'ST234. 4K, Kigali'])
            const doneBy = faker.helpers.arrayElement(['John Doe', 'Jane Doe']);

            const obj = {
                id,
                name,
                address,
                company,
                doneBy
            };
            data.push(obj);
        }
        return data;
    };

    useEffect(() => {
        if (currentTable === 'aeroplanes') {
            setSearchKey('name');
            setBreadcrumbTitle('Supported Aeroplanes');
            setAddLabel('Add Aeroplane');
            setTableHead([
                { id: 'name', label: 'Name', alignRight: false },
                { id: 'company', label: 'Owner (Company)', alignRight: false },
                { id: 'doneBy', label: 'Added by', alignRight: false }
            ]);
        } else if (currentTable === 'companies') {
              setSearchKey('name');
              setBreadcrumbTitle('Aeroplane Companies');
            setAddLabel('Add new company');
              setTableHead([
                  { id: 'name', label: 'Company Name', alignRight: false },
                  { id: 'address', label: 'Address', alignRight: false },
                  { id: 'doneBy', label: 'Added by', alignRight: false }
              ]);
        }
    }, [currentTable]);

    return (
        <>
            <List
                search_key={searchKey}
                add_label={addLabel}
                source_type="plane"
                breadcrumbTitle={breadcrumbTitle}
                table_data={generateData()}
                table_head={tableHead}
                onTableChange={(value) => setCurrentTable(value)}
                currentTable={currentTable}
            />
        </>
    );
}

export default Planes;
