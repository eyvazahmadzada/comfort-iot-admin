import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import appService from 'api/services/app.service';
import { AUTH_TOKEN_KEY } from 'constants/config';
import NavigationScroll from 'layout/NavigationScroll';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Routes from 'routes';
import themes from 'themes';
import Cookie from 'utils/Cookie';

// routing
// defaultTheme
// project imports
// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            const token = Cookie.get(AUTH_TOKEN_KEY);
            if (token) {
                const verifyTokenRes = await appService.verifyToken(token);
                if (!verifyTokenRes) {
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
        };

        checkToken();
    }, [navigate]);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
