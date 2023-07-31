import { useMemo, useState } from 'react';
// @mui
import {
    Avatar,
    Box,
    Button,
    Card,
    Checkbox,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import Moment from 'react-moment';

// components
import HeaderBreadcrumbs from '../HeaderBreadcrumbs';
import Iconify from '../Iconify';
import Scrollbar from '../Scrollbar';
import SearchNotFound from '../SearchNotFound';
// sections
import AgentsForm from '../../pages/Agents/AgentsForm';
import AlertsForm from '../../pages/Alerts/AlertsForm';
import FlightsForm from '../../pages/Flights/FlightsForm';
import PlanesForm from '../../pages/Planes/PlanesForm';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/user/list';
import Popup from '../Modal/Modal';

import { enqueueSnackbar } from 'notistack';
import CelebrationsForm from 'pages/Celebrations/CelebrationsForm';
import { axios } from 'utils/axios.interceptor';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function List({
    disable_edit = false,
    table_data,
    table_head,
    search_key,
    add_label,
    source_type,
    breadcrumbTitle,
    currentTable,
    onTableChange,
    refresh = () => { }
}) {
    // const theme = useTheme();

    const [userList,] = useState(table_data);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [showModal, setShowModal] = useState(false);
    // const [showMinutePriceModal, setMinutePriceModal] = useState(false);

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (checked) => {
        if (checked) {
            const newSelecteds = userList.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (filterName) => {
        setFilterName(filterName);
        setPage(0);
    };

    const handleDelete = async (id) => {
        enqueueSnackbar("Deleting " + source_type, { variant: 'info' })
        let deleteURI = ''
        switch (source_type) {
            case 'agent':
                deleteURI = `/auth/delete-user/${id}`
                break;
            case 'plane':
                deleteURI = `/constant/delete-airplane/${id}`
                break;
            case 'alert':
                deleteURI = currentTable === 'templates' ? `/template/delete-alert-template/${id}` : `/constant/delete-call-type/${id}`
                break;
            case 'Product':
                deleteURI = `/product/delete/${id}`
                break;
            case 'PS4 Machine':
                deleteURI = `/device/delete/${id}`
                break;
            case 'pricing':
                deleteURI = `/price/delete/${id}`
                break;
            default:
                break;
        }

        try {
            const { data } = await axios.delete(deleteURI, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            })
            enqueueSnackbar(data.message, { variant: 'success' })
        } catch (e) {
            enqueueSnackbar(e.response ? e.response.data.message : 'Failed to delete ' + source_type, { variant: 'error' })
        } finally {
            refresh()
        }
    };

    const handleDeleteMultiUser = async (selected) => {
        for (let user of selected) await handleDelete(user)
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

    const filteredUsers = useMemo(() => applySortFilter(table_data, Array.isArray(search_key) ? [...search_key] : [search_key], filterName), [filterName, table_data, search_key])

    const isNotFound = !filteredUsers.length && Boolean(filterName);
    // const isNotFound = false;

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    //   const toggleFormModal = () => {
    //     setMinutePriceModal(!showMinutePriceModal)
    //   }
    return (
        <Container maxWidth={false}>
            <HeaderBreadcrumbs
                heading={breadcrumbTitle ? breadcrumbTitle : source_type.charAt(0).toUpperCase() + source_type.slice(1) + 's'}
                links={[{ name: 'Dashboard', href: '/dashboard' }, { name: source_type }]}
                action={
                    <>
                        <Popup
                            open={showModal}
                            toggleModal={toggleModal}
                            trigger={
                                <Button variant="contained" className="bg-primary" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                                    {add_label}
                                </Button>
                            }
                        >
                            {source_type === 'agent' ? (
                                <AgentsForm action="Add" toggleModal={toggleModal} refresh={refresh} />
                            ) : source_type === 'flight' ? (
                                <FlightsForm action="Add" toggleModal={toggleModal} refresh={refresh} />
                            ) : source_type === 'alert' ? (
                                <AlertsForm action_label={add_label} currentTable={currentTable} action="Add" toggleModal={toggleModal} refresh={refresh} />
                            ) : source_type === 'celebration' ? (
                                <CelebrationsForm action_label={add_label} currentTable={currentTable} action="Add" toggleModal={toggleModal} refresh={refresh} />
                            ) : source_type === 'plane' ? (
                                <PlanesForm action="Add" toggleModal={toggleModal} refresh={refresh} />
                            ) : null}
                        </Popup>
                    </>
                }
            />

            <Card>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Box sx={{ flexGrow: 6 }}>
                        <UserListToolbar
                            numSelected={selected.length}
                            filterName={filterName}
                            onFilterName={handleFilterByName}
                            onDeleteUsers={() => handleDeleteMultiUser(selected)}
                        />
                    </Box>
                    {source_type === 'plane' ? (
                        <></>
                        // <Box sx={{ flexGrow: 0.5 }}>
                        //     <FormControl>
                        //         <InputLabel id="select-label" className="text-primary font-bold">
                        //             Table
                        //         </InputLabel>
                        //         <Select
                        //             labelId="select-label"
                        //             id="demo-simple-select"
                        //             value={currentTable}
                        //             label="Age"
                        //             onChange={(e) => onTableChange(e.target.value)}
                        //         >
                        //             <MenuItem value={'aeroplanes'}>Supported Aeroplanes</MenuItem>
                        //             <MenuItem value={'companies'}>Aeroplane companies</MenuItem>
                        //         </Select>
                        //     </FormControl>
                        // </Box>
                    ) : source_type === 'alert' && (
                        <Box sx={{ flexGrow: 0.5 }}>
                            <FormControl>
                                <InputLabel id="select-label" className="text-primary font-bold">
                                    Choose Table
                                </InputLabel>
                                <Select
                                    labelId="select-label"
                                    id="demo-simple-select"
                                    value={currentTable}
                                    label="Age"
                                    onChange={(e) => onTableChange(e.target.value)}
                                >
                                    <MenuItem value={'call_types'}>Call Types</MenuItem>
                                    <MenuItem value={'templates'}>Templates</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    )}
                </Box>

                <Scrollbar>
                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                            <UserListHead
                                order={order}
                                orderBy={orderBy}
                                headLabel={table_head}
                                rowCount={userList.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                                onSelectAllClick={handleSelectAllClick}
                            />
                            <TableBody>
                                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
                                    const { id } = row;
                                    // const { id, avatarUrl, name, email, phoneNumber, dob, gender, shift, created_at, status } = row;
                                    const isItemSelected = selected.indexOf(id) !== -1;

                                    return (
                                        <TableRow
                                            hover
                                            key={idx}
                                            tabIndex={-1}
                                            role="checkbox"
                                            selected={isItemSelected}
                                            aria-checked={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isItemSelected} onClick={() => handleClick(id)} />
                                            </TableCell>
                                            {table_head &&
                                                table_head.map((col, cell_index) => (
                                                    source_type === 'agent' && col.id === 'name' ? (
                                                        <TableCell key={cell_index} sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Avatar alt={'agent avatar'} src={row['avatarUrl']} sx={{ mr: 2 }} />
                                                            <Typography variant="p" noWrap>
                                                                {row[col.id]}
                                                            </Typography>
                                                        </TableCell>
                                                    ) : (
                                                        <TableCell key={cell_index} align="left">
                                                            <Typography variant="p" noWrap>
                                                                {col.id === 'created_at' ? (
                                                                    <Moment date={row[col.id]} fromNow />
                                                                ) : col.id === 'dob' ? (
                                                                    <Moment date={row[col.id]} format="YYYY/MM/DD" />
                                                                ) : col.id === 'timestamp' ? (
                                                                    <Moment date={row[col.id]} local />
                                                                ) : (
                                                                    row[col.id]
                                                                )}
                                                            </Typography>
                                                        </TableCell>
                                                    )
                                                ))}

                                            {!disable_edit && (
                                                <TableCell align="right">
                                                    <UserMoreMenu
                                                        edit_label={currentTable ? `Edit` :
                                                            `Edit ${source_type}`}
                                                        currentTable={currentTable}
                                                        source_type={source_type}
                                                        onDelete={() => handleDelete(row['id'])}
                                                        userName={row[search_key]}
                                                        rowInfo={row}
                                                        refresh={refresh}
                                                    />
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            {isNotFound && (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={12} sx={{ py: 3 }}>
                                            <SearchNotFound searchQuery={filterName} />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(e, page) => setPage(page)}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </Container>
    );
}

// ----------------------------------------------------------------------

function applySortFilter(data, search_keys, query) {
    const search_query = query.toLowerCase();
    if (search_query) {
        return data.filter((item) => {
            return search_keys.some(key => {
                if (item[key] === undefined) return false
                return item[key].toString().toLowerCase().includes(search_query)
            })
        });
    }
    return data;
}

