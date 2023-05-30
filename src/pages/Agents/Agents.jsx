import React from 'react'
import List from "../../components/Table/List"
import { faker } from '@faker-js/faker';


function Agents() {
  const generateData = () => {
    const users = [];
    for (let i = 0; i < 10; i++) {
      const id = i + 1;
      const name = faker.person.fullName();
      const email = faker.internet.email();
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
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'phoneNumber', label: 'Phone', alignRight: false },
    { id: 'dob', label: 'DOB', alignRight: false },
    { id: 'gender', label: 'Gender', alignRight: false },
    { id: 'shift', label: 'Shift', alignRight: false },
    { id: 'createdAt', label: 'Started', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
  ];

  return (
    <>
      <List search_key={searchKey} add_label={'New Agent'} source_type='agent' table_data={generateData()} table_head={table_head} />
    </>
  )
}

export default Agents