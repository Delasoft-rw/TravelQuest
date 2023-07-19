import { useState } from 'react';
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
import ClientsForm from '../../pages/Clients/ClientsForm';
import FlightsForm from '../../pages/Flights/FlightsForm';
import PlanesForm from '../../pages/Planes/PlanesForm';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/user/list';
import Popup from '../Modal/Modal';

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
    onTableChange
}) {
    // const theme = useTheme();

    const [userList, setUserList] = useState(table_data);

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

    const handleDeleteUser = (userId) => {
        const deleteUser = userList.filter((user) => user.id !== userId);
        setSelected([]);
        setUserList(deleteUser);
    };

    const handleDeleteMultiUser = (selected) => {
        const deleteUsers = userList.filter((user) => !selected.includes(user.id));
        setSelected([]);
        setUserList(deleteUsers);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

    const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName, search_key);

    const isNotFound = !filteredUsers.length && Boolean(filterName);

    const toggleModal = () => {
        setShowModal(!showModal);
    };
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
                                <AgentsForm action="Add" toggleModal={toggleModal} />
                            ) : source_type === 'client' ? (
                                <ClientsForm action="Add" toggleModal={toggleModal} />
                            ) : source_type === 'flight' ? (
                                <FlightsForm action="Add" toggleModal={toggleModal} />
                            ) : source_type === 'alert' ? (
                                <AlertsForm action_label={add_label} currentTable={currentTable} action="Add" toggleModal={toggleModal} />
                            ) : source_type === 'plane' ? (
                                <PlanesForm action_label={add_label} currentTable={currentTable} action="Add" toggleModal={toggleModal} />
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
                        <Box sx={{ flexGrow: 0.5 }}>
                            <FormControl>
                                <InputLabel id="select-label" className="text-primary font-bold">
                                    Table
                                </InputLabel>
                                <Select
                                    labelId="select-label"
                                    id="demo-simple-select"
                                    value={currentTable}
                                    label="Age"
                                    onChange={(e) => onTableChange(e.target.value)}
                                >
                                    <MenuItem value={'aeroplanes'}>Supported Aeroplanes</MenuItem>
                                    <MenuItem value={'companies'}>Aeroplane companies</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
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
                                    // const { id, avatarUrl, name, email, phoneNumber, dob, gender, shift, createdAt, status } = row;
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
                                                table_head.map((col, idx) => (
                                                    <>
                                                        {source_type === 'agent' && col.id === 'name' ? (
                                                            <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <Avatar alt={'agent avatar'} src={row['avatarUrl']} sx={{ mr: 2 }} />
                                                                <Typography variant="p" noWrap>
                                                                    {row[col.id]}
                                                                </Typography>
                                                            </TableCell>
                                                        ) : (
                                                          <TableCell key={idx} align="left">
                                                            <Typography variant="p" noWrap>
                                                                {col.id === 'createdAt' ? (
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
                                                                  )}
                                                    </>
                                                ))}

                                            {!disable_edit && (
                                                <TableCell align="right">
                                                    <UserMoreMenu
                                                        edit_label={currentTable ? `Edit` : 
                                                      `Edit ${source_type}`}
                                                        currentTable={currentTable}
                                                        source_type={source_type}
                                                        onDelete={() => handleDeleteUser(row['id'])}
                                                        userName={row[search_key]}
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
                    count={userList.length}
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

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query, search_key) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return array.filter((_user) => _user[search_key].toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}
