export const getUserInfo = () => {
    try {
        return JSON.parse(localStorage.getItem('user') ?? '{}');
    } catch (error) {
        return {};
    }
};
