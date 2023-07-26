import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { axios } from 'utils/axios.interceptor';
import { closeSnackbar, enqueueSnackbar } from 'utils/index';
import List from '../../components/Table/List';

const table_metadata = {
    templates: {
        table_head: [
            { id: 'language', label: 'Language', alignRight: false },
            { id: 'title', label: 'Title', alignRight: false },
            { id: 'body', label: 'Body', alignRight: false },
            { id: 'created_at', label: 'Created At', alignRight: false },
        ],
        search_key: ['language', 'title', 'body', 'created_at']
    },
    call_types: {
        table_head: [
            { id: 'name', label: 'Name', alignRight: false },
            { id: 'type', label: 'Type', alignRight: false },
            { id: 'status', label: 'Status', alignRight: false },
            { id: 'created_at', label: 'Created At', alignRight: false }
        ],
        search_key: ['name', 'type',]
    }
}

function Receptionist() {
    const [currentTable, setCurrentTable] = useState('templates');
    const [addLabel, setAddLabel] = useState('Add Template');
    const [searchKey, setSearchKey] = useState(table_metadata.templates.search_key);
    const [breadcrumbTitle, setBreadcrumbTitle] = useState('Message/Call templates');
    const [tableHead, setTableHead] = useState([]);
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [key, setKey] = React.useState(null)

    const getAlerts = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get('/template/all-alert-templates')

            console.log(data)
            setData(data.data.map(el => ({ ...el })));
        } catch (e) {
            console.log(e)
            enqueueSnackbar('Failed to load airplanes', {
                action: () => (<>
                    <Button onClick={() => {
                        getAlerts()
                    }} >Try Again</Button>
                </>)
            })
        } finally {
            setLoading(false)
        }
    }

    const getCallTypes = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get('/constant/all-call-types')
            console.log(data)
            setData(data.map(el => ({ ...el })));
        } catch (e) {
            console.log(e)
            enqueueSnackbar('Failed to load airplanes', {
                action: () => (<>
                    <Button onClick={() => {
                        getCallTypes()
                    }} >Try Again</Button>
                </>)
            })
        } finally {
            setLoading(false)
        }
    }

    const getData = () => {
        if (currentTable === 'templates') {
            getAlerts();
        } else if (currentTable === 'call_types') {
            getCallTypes();
        }
    }

    useEffect(() => {
        if (currentTable === 'templates') {
            setBreadcrumbTitle('Message/Call templates');
            setAddLabel('Add Template');
            setSearchKey(table_metadata.templates.search_key);
            setTableHead(table_metadata.templates.table_head);
        } else if (currentTable === 'call_types') {
            setBreadcrumbTitle('Call Types');
            setAddLabel('Add new call type');
            setSearchKey(table_metadata.call_types.search_key);
            setTableHead(table_metadata.call_types.table_head);
        }
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTable]);

    React.useEffect(() => {
        if (loading && !key) {
          setKey(enqueueSnackbar('Loading...', {
            persist: true,
          }))
        } else if (!loading && key) {
          closeSnackbar(key)
          setKey(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [loading])

    return (
        <>
            <List
                search_key={searchKey}
                add_label={addLabel}
                source_type="alert"
                breadcrumbTitle={breadcrumbTitle}
                table_data={data}
                table_head={tableHead}
                onTableChange={(value) => setCurrentTable(value)}
                currentTable={currentTable}
                refresh={getData}
            />
        </>
    );
}

export default Receptionist;
