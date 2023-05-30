import React from 'react'
import List from "../../components/Table/List"
import { faker } from '@faker-js/faker';


function Receptionist() {
  const generateData = () => {
    const users = [];
    for (let i = 0; i < 10; i++) {
      const id = i + 1;
      const name = faker.helpers.arrayElement(["Wishing Birthday", "Flight Reminder", "Wishing Happy Holidays"]);
      const title = faker.lorem.lines(1);
      const body = faker.lorem.lines(3);
      const timestamp = faker.date.anytime();
      // const doneBy = faker.helpers.arrayElement(['Aime', 'JC']);

      const user = {
        id,
       name,
       title,
       body,
       body,
       timestamp,
      //  doneBy
      };
      users.push(user);
    }
    return users;
  }

  let searchKey = 'name';
  const table_head = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'timestamp', label: 'Timestamp', alignRight: false },
    // { id: 'doneBy', label: 'Done By', alignRight: false },
    { id: 'title', label: 'Title', alignRight: false },
    { id: 'body', label: 'Body', alignRight: false },
  ];


  return (
    <>
      <List search_key={searchKey} add_label={'New Alert'} source_type='alert' breadcrumbTitle= "Message/Call templates" table_data={generateData()} table_head={table_head} />
    </>
  )
}

export default Receptionist