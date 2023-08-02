import { faker } from '@faker-js/faker';
import List from "../../components/Table/List";


function Celebrations() {
  // const [data, setData] = React.useState([])
  // const [loading, setLoading] = React.useState(false)
  // const [key, setKey] = React.useState(null)

  // const getClients = async () => {
  //   setLoading(true)
  //   try {
  //     const { data } = await axios.get('/auth/all-users', {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`
  //       }
  //     })

  //     console.log(data)
  //     setData(data.map(el => ({ ...el })));
  //   } catch (e) {
  //     console.log(e)
  //     enqueueSnackbar('Failed to load clients', {
  //       action: () => (<>
  //         <Button onClick={() => {
  //           getClients()
  //         }} >Try Again</Button>
  //       </>)
  //     })
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const randomDateOfBirth = () => {
    const start = new Date(1950, 0, 1); // January 1, 1950
    const end = new Date(2005, 11, 31); // December 31, 2005
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };
  
  const generateMessage = (clientName) => {
    const messages = [
      `Happy birthday, ${clientName}! May your day be filled with joy and laughter.`,
      `Wishing you a fantastic birthday, ${clientName}! Enjoy your special day.`,
      `Happy birthday, ${clientName}! May this year be the best one yet.`,
      // Add more celebratory messages here
    ];
    return faker.helpers.arrayElement(messages);
  };
  
  const generate_data = () => {
    const dataArray = [];
    for (let i = 0; i < 6; i++) {
      const clientName = faker.person.fullName();
      const DOB = randomDateOfBirth().toDateString();
      const message = generateMessage(clientName);
  
      dataArray.push({ clientName, DOB, message });
    }
    return dataArray;
  };

  let searchKey = 'fullName';
  const table_head = [
    { id: 'clientName', label: 'Client Names', alignRight: false },
    // { id: 'DOB', label: 'Date', alignRight: false },
    { id: 'message', label: 'Template', alignRight: false },
  ];

  // React.useEffect(() => {
  //   getClients()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // React.useEffect(() => {
  //   if (loading && !key) {
  //     setKey(enqueueSnackbar('Loading...', {
  //       persist: true,
  //     }))
  //   } else if (!loading && key) {
  //     closeSnackbar(key)
  //     setKey(null)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loading])

  return (
    <>
      <List refresh={() => {}} search_key={searchKey} add_label={'New Celebration'} source_type='celebration' table_data={generate_data()} table_head={table_head} />
    </>
  )
}

export default Celebrations