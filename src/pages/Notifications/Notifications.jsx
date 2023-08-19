import { faker } from '@faker-js/faker';
import List from "../../components/Table/List";
import React from 'react';
import { axios } from 'utils/axios.interceptor';
import { closeSnackbar, enqueueSnackbar } from 'utils/index';
import { Button } from '@mui/material';


function Notifications() {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [key, setKey] = React.useState(null)

  const getNotifications = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('/notification/list', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      console.log(data)
      setData(data.data.map(el => ({ ...el })));
    } catch (e) {
      console.log(e)
      enqueueSnackbar('Failed to load notifications', {
        action: () => (<>
          <Button onClick={() => {
            getNotifications()
          }} >Try Again</Button>
        </>)
      })
    } finally {
      setLoading(false)
    }
  }

  // const randomDateOfBirth = () => {
  //   const start = new Date(1950, 0, 1); // January 1, 1950
  //   const end = new Date(2005, 11, 31); // December 31, 2005
  //   return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  // };
  
  // const generateMessage = (clientName) => {
  //   const messages = [
  //     `Happy birthday, ${clientName}! May your day be filled with joy and laughter.`,
  //     `Wishing you a fantastic birthday, ${clientName}! Enjoy your special day.`,
  //     `Happy birthday, ${clientName}! May this year be the best one yet.`,
  //     // Add more celebratory messages here
  //   ];
  //   return faker.helpers.arrayElement(messages);
  // };
  
  // const generate_data = () => {
  //   const dataArray = [];
  //   for (let i = 0; i < 6; i++) {
  //     const clientName = faker.person.fullName();
  //     const DOB = randomDateOfBirth().toDateString();
  //     const message = generateMessage(clientName);
  
  //     dataArray.push({ clientName, DOB, message });
  //   }
  //   return dataArray;
  // };

  let searchKey = 'fullName';
  const table_head = [
    { id: 'phone_number', label: 'Phone Number', alignRight: false },
    // { id: 'DOB', label: 'Date', alignRight: false },
    { id: 'message', label: 'Template', alignRight: false },
    { id: 'doneBy', label: 'Done By', alignRight: false },
    { id: 'created_at', label: 'Created At', alignRight: false },

  ];

  React.useEffect(() => {
    getNotifications()
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
      <List refresh={getNotifications} search_key={searchKey} add_label={'New Notification'} source_type='notification' table_data={data} table_head={table_head} />
    </>
  )
}

export default Notifications