import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { useState } from 'react';
// next
import { Link } from 'react-router-dom';
// @mui
import { MenuItem, IconButton } from '@mui/material';

// components
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/MenuPopover';
import Popup from 'components/Modal/Modal';
import ReceptionistForm from 'pages/Agents/ReceptionistForm';

// ----------------------------------------------------------------------

UserMoreMenu.propTypes = {
    onDelete: PropTypes.func,
    userName: PropTypes.string
};

export default function UserMoreMenu({ onDelete, userName, source_type }) {
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

                <Link href={`${'/'}/${paramCase(userName)}/edit`}>
                    <Popup
                        open={showModal}
                        toggleModal={toggleModal}
                        trigger={
                            <MenuItem>
                                <Iconify icon={'eva:edit-fill'} sx={{ mr: 2, width: 24, height: 24 }} />
                                Edit
                            </MenuItem>
                        }
                    >
                        {source_type === 'receptionist' ? (
                            <ReceptionistForm action="Edit" toggleModal={toggleModal} />
                        ) : null}
                    </Popup>
                </Link>
            </MenuPopover>
        </>
    );
}
