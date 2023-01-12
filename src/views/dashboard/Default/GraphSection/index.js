/* eslint-disable */
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
    Avatar,
    Box,
    ButtonBase,
    ClickAwayListener,
    Divider,
    Grid,
    Paper,
    Popper,
    TextField,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import appService from 'api/services/app.service';
import { useEffect, useRef, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';

import chartData from '../chart-data/line-area-chart';
import Graphs from './Graphs';

// material-ui
// third-party
// project imports
// assets
// notification status options
const status = [
    {
        value: 'temperature',
        label: 'Temperature'
    },
    {
        value: 'humidity',
        label: 'Humidity'
    },
    {
        value: 'light',
        label: 'Light'
    },
    {
        value: 'pressure',
        label: 'Pressure'
    }
];

// ==============================|| NOTIFICATION ||============================== //

const GraphSection = ({ roomName }) => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('temperature');
    const [chart, setChart] = useState(null);
    const [room, setRoom] = useState(null);
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const handleChange = (event) => {
        if (event?.target.value) setValue(event?.target.value);
    };

    useEffect(() => {
        const getRoom = async () => {
            const room = await appService.getRoom(roomName);
            setRoom(room);
        };

        getRoom();
    }, []);

    useEffect(() => {
        if (room) {
            const values = Object.values(room).map((item) => item[value]);
            const newChartData = { ...chartData };
            newChartData.series[0].data = values;
            setChart(newChartData);
        }
    }, [room, value]);

    return (
        <>
            <Box
                sx={{
                    ml: 2,
                    mr: 3,
                    [theme.breakpoints.down('md')]: {
                        mr: 2
                    }
                }}
            >
                <ButtonBase sx={{ borderRadius: '12px' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&[aria-controls="menu-list-grow"],&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="inherit"
                    >
                        <MoreHorizIcon stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>
            <Popper
                placement={matchesXs ? 'bottom-start' : 'bottom-start'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item xs={12}>
                                            <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2, px: 2 }}>
                                                <Grid item>
                                                    <Typography variant="subtitle1">Graphs</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <PerfectScrollbar
                                                style={{ height: '100%', maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden' }}
                                            >
                                                <Grid container direction="column" spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Box sx={{ px: 2, pt: 0.25 }}>
                                                            <TextField
                                                                id="outlined-select-currency-native"
                                                                select
                                                                fullWidth
                                                                value={value}
                                                                onChange={handleChange}
                                                                SelectProps={{
                                                                    native: true
                                                                }}
                                                            >
                                                                {status.map((option) => (
                                                                    <option key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </option>
                                                                ))}
                                                            </TextField>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12} p={0}>
                                                        <Divider sx={{ my: 0 }} />
                                                    </Grid>
                                                </Grid>
                                                {chart && <Graphs chart={chart} />}
                                            </PerfectScrollbar>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default GraphSection;
