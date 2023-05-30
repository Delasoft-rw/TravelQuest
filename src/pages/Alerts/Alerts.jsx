import React from 'react'
import List from "../../components/Table/List"
import { faker } from '@faker-js/faker';


function Receptionist() {
  const generateUsers = () => {
    const users = [];
    for (let i = 0; i < 10; i++) {
      const id = i + 1;
      const name = faker.person.fullName();
      const email = faker.internet.email();
      const messageTemplate = faker.helpers.arrayElement(["Wishing Birthday", "Flight Reminder", "Wishing Happy Holidays"]);
      const phoneNumber = faker.phone.number('+48 91 ### ## ##');
      const dob = faker.date.past();
      const gender = faker.helpers.arrayElement(['Male', 'Female', 'Other']);
      const shift = faker.helpers.arrayElement(['Morning', 'Afternoon', 'Evening']);
      const createdAt = faker.date.past();
      const status = faker.helpers.arrayElement(['Active', 'Inactive']);

      const user = {
        id,
        // avatarUrl: 'https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1',
        name,
        email,
        phoneNumber,
        dob,
        gender,
        shift,
        createdAt,
        status
      };
      users.push(user);
    }
    return users;
  }

  let searchKey = 'name';
  const table_head = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'title', label: 'Title', alignRight: false },
    { id: 'body', label: 'Body', alignRight: false },
    { id: 'timestamp', label: 'Timestamp', alignRight: false },
    { id: 'doneBy', label: 'Done By', alignRight: false },
  ];


  return (
    <>
      <List search_key={searchKey} add_label={'New Alert'} source_type='alert' breadcrumbTitle= "Message/Call templates" table_data={generateUsers()} table_head={table_head} />
    </>
  )
}

export default Receptionist