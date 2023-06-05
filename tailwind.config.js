/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        fontFamily: {
            inter: ['Inter', 'Public Sans']
        },
        extend: {
            colors: {
                primary: '#86162C'
            }
        }
    },
    plugins: []
};
