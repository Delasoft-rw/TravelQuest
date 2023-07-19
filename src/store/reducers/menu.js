// types
import { createSlice } from '@reduxjs/toolkit';
import { getUserInfo } from 'utils/index';

// initial state
const initialState = {
    openItem: ['dashboard'],
    openComponent: 'buttons',
    drawerOpen: false,
    componentDrawerOpen: true,
    userInfo: getUserInfo()
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        activeItem(state, action) {
            state.openItem = action.payload.openItem;
        },

        activeComponent(state, action) {
            state.openComponent = action.payload.openComponent;
        },

        openDrawer(state, action) {
            state.drawerOpen = action.payload.drawerOpen;
        },

        openComponentDrawer(state, action) {
            state.componentDrawerOpen = action.payload.componentDrawerOpen;
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload.userInfo;
        }
    }
});

export default menu.reducer;

export const { activeItem, activeComponent, openDrawer, openComponentDrawer, setUserInfo } = menu.actions;
