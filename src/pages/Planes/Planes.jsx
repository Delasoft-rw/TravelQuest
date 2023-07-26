import { Button } from '@mui/material';
import React from 'react';
import { axios } from 'utils/axios.interceptor';
import { closeSnackbar, enqueueSnackbar } from 'utils/index';
import List from '../../components/Table/List';

function Planes() {
    const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [key, setKey] = React.useState(null)

  const getPlanes = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('/constant/all-airplanes')

      console.log(data)
      setData(data.map(el => ({ ...el })));
    } catch (e) {
      console.log(e)
      enqueueSnackbar('Failed to load airplanes', {
        action: () => (<>
          <Button onClick={() => {
            getPlanes()
          }} >Try Again</Button>
        </>)
      })
    } finally {
      setLoading(false)
    }
  }

  let searchKey = ['name', 'airplaneCode', 'created_at'];

  const table_head = [
    {id: 'name', label: 'Name', alignRight: false},
    {id: 'airplaneCode', label: 'Airplane Code', alignRight: false},
    { id: 'created_at', label: 'Created At', alignRight: false },
  ];

  React.useEffect(() => {
    getPlanes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
                add_label={'New Plane'}
                source_type="plane"
                refresh={getPlanes}
                table_data={data}
                table_head={table_head}
            />
        </>
    );
}

export default Planes;
