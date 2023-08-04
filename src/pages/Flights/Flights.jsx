import { Button } from '@mui/material/index';
import React from 'react';
import { axios } from 'utils/axios.interceptor';
import { closeSnackbar, enqueueSnackbar } from 'utils/index';
import List from "../../components/Table/List";


function Flights() {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [key, setKey] = React.useState(null)

  const getFlightSchedules = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('/flight-schedule/all')

      console.log(data)
      setData(data.map(el => ({ ...el })));
    } catch (e) {
      console.log(e)
      enqueueSnackbar('Failed to load clients', {
        action: () => (<>
          <Button onClick={() => {
            getFlightSchedules()
          }} >Try Again</Button>
        </>)
      })
    } finally {
      setLoading(false)
    }
  }

  let searchKey = ['flight_number', 'departure_airport', 'arrival_airport', 'departure_time', 'arrival_time', 'status', 'caller_type_id', 'airplane_id', 'alert_template_id', 'ticket_number', 'counter', 'userdetails_id'];

  const table_head = [
    { id: 'flight_number', label: 'Flight Number', alignRight: false },
    // { id: 'departure_airport', label: 'Departure Airport', alignRight: false },
    // { id: 'arrival_airport', label: 'Arrival Airport', alignRight: false },
    { id: 'departure_time', label: 'Departure Time', alignRight: false },
    // { id: 'arrival_time', label: 'Arrival Time', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'caller_type_id', label: 'Caller Type ID', alignRight: false },
    { id: 'airplane_id', label: 'Airplane ID', alignRight: false },
    { id: 'alert_template_id', label: 'Alert Template ID', alignRight: false },
    { id: 'ticket_number', label: 'Ticket Number', alignRight: false },
    // { id: 'counter', label: 'Counter', alignRight: false },
    { id: 'userdetails_id', label: 'User Details ID', alignRight: false },
  ];

  React.useEffect(() => {
    getFlightSchedules()
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
      <List refresh={getFlightSchedules} search_key={searchKey} add_label={'New Flight'} source_type='flight' breadcrumbTitle="Flights Schedule" table_data={data} table_head={table_head} />
    </>
  )
}

export default Flights