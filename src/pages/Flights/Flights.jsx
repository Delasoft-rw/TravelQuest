import React from 'react'
import List from "../../components/Table/List"
import { faker } from '@faker-js/faker';


function Flights() {
  const generateUsers = () => {
    const users = [];
    for (let i = 0; i < 10; i++) {
      const id = i + 1;
      const client = faker.person.fullName();
      const callType = faker.helpers.arrayElement(["Hourly", "30 Minutes", "Daily"]);
      const messageTemplate = faker.helpers.arrayElement(["Wishing Birthday", "Flight Reminder", "Wishing Happy Holidays"]);
      const timestamp = faker.date.past();
      const plane = faker.helpers.arrayElement(['AK45CD', 'RW135TD', '334CDOO']);
      const ticketId = faker.helpers.arrayElement(['fade44s3dd33f', 'ffceeekk', 'rwwfedemmydex']);
      const createdAt = faker.date.past();

      const user = {
        id,
        // avatarUrl: 'https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1',
        client,
        callType,
        messageTemplate,
        timestamp,
        plane,
        ticketId,
        createdAt
      };
      users.push(user);
    }
    return users;
  }

  let searchKey = 'client';
  const table_head = [
    { id: 'client', label: 'Client', alignRight: false },
    { id: 'callType', label: 'Call Type', alignRight: false },
    { id: 'messageTemplate', label: 'Message Template', alignRight: false },
    { id: 'timestamp', label: 'Timestamp', alignRight: false },
    { id: 'plane', label: 'plane', alignRight: false },
    { id: 'ticketId', label: 'Ticket No.', alignRight: false },
    { id: 'createdAt', label: 'Started', alignRight: false },
  ];

  return (
    <>
      <List search_key={searchKey} add_label={'New Flight'} source_type='flight' breadcrumbTitle="Flights Schedule" table_data={generateUsers()} table_head={table_head} />
    </>
  )
}

export default Flights