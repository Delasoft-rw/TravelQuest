import React from 'react'
import List from "../../components/Table/List"
import { faker } from '@faker-js/faker';


function Clients() {
  const generateData = () => {
    const users = [];
    for (let i = 0; i < 10; i++) {
      const id = i + 1;
      const fullName = faker.person.fullName();
      const phoneNumber1 = faker.phone.number('+250 91 ### ## ##');
      const phoneNumber2 = faker.phone.number('+250 30 ### ## ##');
      const personalEmail = faker.internet.email();
      const workEmail = faker.internet.email();
      const address = faker.helpers.arrayElement(['Kigali', 'Karongi', 'Muhanga']);;
      const nationality = faker.helpers.arrayElement(['Rwandan']);;
      const country = faker.helpers.arrayElement(['Rwanda']);;
      const placeOfIssue = faker.helpers.arrayElement(['Kigali, Rwanda']);;
      const dob = faker.date.past();
      const gender = faker.helpers.arrayElement(['Male', 'Female', 'Other']);
      const shift = faker.helpers.arrayElement(['Morning', 'Afternoon', 'Evening']);
      const createdAt = faker.date.past();
      const doneBy = faker.helpers.arrayElement(['Aime', 'JC']);

      const user = {
        id,
        // avatarUrl: 'https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1',
        fullName,
        phoneNumber1,
        phoneNumber2,
        personalEmail,
        workEmail,
        address,
        nationality,
        country,
        placeOfIssue,
        dob,
        gender,
        shift,
        createdAt,
        doneBy
      };
      users.push(user);
    }
    return users;
  }

  let searchKey = 'fullName';
  const table_head = [
    { id: 'fullName', label: 'Full Name', alignRight: false },
    { id: 'phoneNumber1', label: 'Phone 1', alignRight: false },
    { id: 'phoneNumber2', label: 'Phone 2', alignRight: false },
    { id: 'personalEmail', label: 'Personal Email', alignRight: false },
    { id: 'workEmail', label: 'Work Email', alignRight: false },
    { id: 'address', label: 'Address', alignRight: false },
    { id: 'nationality', label: 'Nationality', alignRight: false },
    { id: 'country', label: 'Country', alignRight: false },
    { id: 'placeOfIssue', label: 'Place Of Issue', alignRight: false },
    { id: 'dob', label: 'DOB', alignRight: false },
    { id: 'gender', label: 'Gender', alignRight: false },
    { id: 'createdAt', label: 'Added', alignRight: false },
    { id: 'doneBy', label: 'Done By', alignRight: false },
  ];

  return (
    <>
      <List search_key={searchKey} add_label={'New Client'} source_type='client' table_data={generateData()} table_head={table_head} />
    </>
  )
}

export default Clients