import PropTypes from 'prop-types';
import { useState } from 'react';
// next
import { Link } from 'react-router-dom';
// @mui
import { IconButton, MenuItem } from '@mui/material';

// components
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/MenuPopover';
import Popup from '../../../components/Modal/Modal';
import AgentsForm from '../../../pages/Agents/AgentsForm';
import AlertsForm from '../../../pages/Alerts/AlertsForm';
import ClientsForm from '../../../pages/Clients/ClientsForm';
import FlightsForm from '../../../pages/Flights/FlightsForm';
import PlanesForm from '../../../pages/Planes/PlanesForm';
import NotificationsForm from 'pages/Notifications/NotificationsForm';

// ----------------------------------------------------------------------

UserMoreMenu.propTypes = {
    onDelete: PropTypes.func,
    userName: PropTypes.string
};

export default function UserMoreMenu({ onDelete, rowInfo, source_type, edit_label, currentTable, refresh = () => {} }) {
    const [open, setOpen] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const ICON = {
        mr: 2,
        width: 20,
        height: 20
    };

    return (
        <>
            <IconButton onClick={handleOpen}>
                <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
            </IconButton>

            <MenuPopover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                arrow="right-top"
                sx={{
                    mt: -1,
                    width: 160,
                    '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 }
                }}
            >
                <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
                    Delete
                </MenuItem>

                {!['agent'].includes(source_type) && (
                    <Link href={`#`}>
                        <Popup
                            open={showModal}
                            toggleModal={toggleModal}
                            trigger={
                                <MenuItem sx={{ color: 'primary.main' }}>
                                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2, width: 24, height: 24 }} />
                                    Edit
                                </MenuItem>
                            }
                        >
                            {source_type === 'agent' ? (
                                <AgentsForm action="Edit" toggleModal={toggleModal} initialData={rowInfo} refresh={refresh} />
                            ) : source_type === 'client' ? (
                                <ClientsForm action="Edit" toggleModal={toggleModal} initialData={rowInfo} refresh={refresh} />
                            ) : source_type === 'flight' ? (
                                <FlightsForm action="Edit" toggleModal={toggleModal} initialData={rowInfo} refresh={refresh} />
                            ) : source_type === 'alert' ? (
                                <AlertsForm
                                    action_label={edit_label}
                                    currentTable={currentTable}
                                    action="Edit"
                                    toggleModal={toggleModal}
                                    initialData={rowInfo}
                                    refresh={refresh}
                                />
                            ) : source_type === 'plane' ? (
                                <PlanesForm action="Edit" toggleModal={toggleModal} initialData={rowInfo} refresh={refresh} />
                            ) : source_type === 'notification' ? (
                                <NotificationsForm action="Edit" toggleModal={toggleModal} initialData={rowInfo} refresh={refresh} />
                            ) : null}
                        </Popup>
                    </Link>
                )}
            </MenuPopover>
        </>
    );
}
