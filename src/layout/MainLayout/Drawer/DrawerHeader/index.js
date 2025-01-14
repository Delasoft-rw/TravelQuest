import PropTypes from 'prop-types';

// material-ui
import { Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import Logo from 'components/Logo';
import DrawerHeaderStyled from './DrawerHeaderStyled';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
    const theme = useTheme();

    return (
        <DrawerHeaderStyled theme={theme} open={open}>
            <Stack direction="column" spacing={1} alignItems="center">
                <Logo />
            </Stack>
        </DrawerHeaderStyled>
    );
};

DrawerHeader.propTypes = {
    open: PropTypes.bool
};

export default DrawerHeader;
