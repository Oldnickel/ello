import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Mulish, Arial, sans-serif',
    },
    palette: {
        primary: {
            main: '#5acccc',
            contrastText: '#ffffff',
            dark: '#335c6e',
            light: '#fabd33',
        },
        secondary: {
            main: '#cffafa',
            contrastText: '#f76434',
            dark: '#4aa088',
            light: '#faad00',
            500: '#53c2c2',
            100: '#ffe6dc',
            200: '#28b8b8',
        },
    },
});

export default theme;
