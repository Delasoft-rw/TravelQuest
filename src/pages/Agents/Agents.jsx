import { Button } from '@mui/material';
import React from 'react';
import { axios } from 'utils/axios.interceptor';
import { closeSnackbar, enqueueSnackbar } from 'utils/index';
import List from "../../components/Table/List";

function Agents() {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [key, setKey] = React.useState(null)

  const getAgents = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('/auth/all-users')

      console.log(data)
      setData(data.map(el => ({ ...el })));
    } catch (e) {
      console.log(e)
      enqueueSnackbar('Failed to load clients', {
        action: () => (<>
          <Button onClick={() => {
            getAgents()
          }} >Try Again</Button>
        </>)
      })
    } finally {
      setLoading(false)
    }
  }

  let searchKey = ['firstName', 'lastName', 'address', 'mobileTelephone', 'workTelephone', 'dob', 'gender', 'status', 'nationality', 'country', 'nid', 'passport', 'language', 'placeOfIssue', 'workEmail', 'userType', 'created_at'];

  const table_head = [
    { id: 'firstName', label: 'First Name', alignRight: false },
    { id: 'lastName', label: 'Last Name', alignRight: false },
    { id: 'address', label: 'Address', alignRight: false },
    { id: 'mobileTelephone', label: 'Mobile Telephone', alignRight: false },
    { id: 'workTelephone', label: 'Work Telephone', alignRight: false },
    { id: 'dob', label: 'Date of Birth', alignRight: false },
    { id: 'gender', label: 'Gender', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'nationality', label: 'Nationality', alignRight: false },
    { id: 'country', label: 'Country', alignRight: false },
    { id: 'nid', label: 'National ID', alignRight: false },
    { id: 'passport', label: 'Passport', alignRight: false },
    { id: 'language', label: 'Language', alignRight: false },
    { id: 'placeOfIssue', label: 'Place of Issue', alignRight: false },
    { id: 'workEmail', label: 'Work Email', alignRight: false },
    { id: 'userType', label: 'User Type', alignRight: false },
    { id: 'created_at', label: 'Created At', alignRight: false },
  ];

  React.useEffect(() => {
    getAgents()
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
      <List refresh={getAgents} search_key={searchKey} add_label={'New Agent'} source_type='agent' table_data={data} table_head={table_head} />
    </>
  )
}

export default Agents