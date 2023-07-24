import React from 'react'
import List from "../../components/Table/List"
import { axios } from 'utils/axios.interceptor';
import { enqueueSnackbar, closeSnackbar } from 'notistack';
import { Button } from '@mui/material';


function Clients() {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [key, setKey] = React.useState(null)

  const getClients = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('/auth/all-users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      console.log(data)
      setData(data.map(el => ({ ...el })));
    } catch (e) {
      console.log(e)
      enqueueSnackbar('Failed to load clients', {
        action: () => (<>
          <Button onClick={() => {
            getClients()
          }} >Try Again</Button>
        </>)
      })
    } finally {
      setLoading(false)
    }
  }

  let searchKey = 'fullName';
  const table_head = [
    { id: 'firstName', label: 'First Name', alignRight: false },
    { id: 'lastName', label: 'Last Name', alignRight: false },
    { id: 'mobileTelephone', label: 'Mobile Tel.', alignRight: false },
    { id: 'workTelephone', label: 'Work Tel.', alignRight: false },
    { id: 'personalEmail', label: 'Personal Email', alignRight: false },
    { id: 'workEmail', label: 'Work Email', alignRight: false },
    { id: 'address', label: 'Address', alignRight: false },
    { id: 'nid', label: 'NID', alignRight: false },
    { id: 'nationality', label: 'Nationality', alignRight: false },
    { id: 'language', label: 'Language', alignRight: false },
    { id: 'country', label: 'Country', alignRight: false },
    { id: 'placeOfIssue', label: 'Place Of Issue', alignRight: false },
    { id: 'dob', label: 'DOB', alignRight: false },
    { id: 'gender', label: 'Gender', alignRight: false },
    { id: 'userType', label: 'User Type', alignRight: false },
    { id: 'createdAt', label: 'Added', alignRight: false },
  ];

  React.useEffect(() => {
    getClients()
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
      <List refresh={getClients} search_key={searchKey} add_label={'New Client'} source_type='client' table_data={data} table_head={table_head} />
    </>
  )
}

export default Clients