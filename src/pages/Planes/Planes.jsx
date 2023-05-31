import React from 'react'
import List from "../../components/Table/List"
import { faker } from '@faker-js/faker';


function Planes() {

  function generateAirplaneName() {
    const prefix = faker.commerce.productAdjective();
    const suffix = faker.commerce.productName();

    return `${prefix} ${suffix}`;
  }

  const generateData = () => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      const id = i + 1;
      const name = generateAirplaneName();
      const contact_email = 'john.doe@gmail.com';
      const contact_phone = faker.phone.number();

      const obj = {
        id,
        name,
        contact_email,
        contact_phone,
      };
      data.push(obj);
    }
    return data;
  }

  let searchKey = 'name';
  const table_head = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'contact_phone', label: 'Contact Phone', alignRight: false },
    { id: 'contact_email', label: 'Contact Email', alignRight: false },
  ];

  return (
    <>
      <List search_key={searchKey} add_label={'New Plane'} source_type='plane' breadcrumbTitle="Supported Aeropanes" table_data={generateData()} table_head={table_head} />
    </>
  )
}

export default Planes