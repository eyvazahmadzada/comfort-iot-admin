// material-ui
import { useTheme } from '@emotion/react';
import { Divider, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';

import GraphSection from '../dashboard/Default/GraphSection';

// material-ui
// project imports
// project imports
// ==============================|| SAMPLE PAGE ||============================== //

const Rooms = () => {
    const importanceInit = {
        'temperature, pressure': [-9, 9],
        'temperature, humidity': [-9, 9],
        'temperature, light': [-9, 9],
        'pressure, humidity': [-9, 9],
        'pressure, light': [-9, 9],
        'humidity, light': [-9, 9]
    };
    const [importance, setImportance] = useState(importanceInit);
    const theme = useTheme();

    const handleImportanceChange = (key, newValue) => {
        // Disable change on some situations
        if (newValue.includes(0) || newValue[0] > 0 || newValue[1] < 0) return false;

        setImportance({ ...importance, [key]: newValue });
    };

    const handleImportanceSave = () => {
        let importanceServerData = {};
        for (const key of Object.keys(importance)) {
            const value = importance[key];
            importanceServerData[key] = Math.abs(value[0] / value[1]);
        }

        // @TODO: save to the server
        console.log(importanceServerData);
    };

    return (
        <MainCard title="Rooms">
            <Grid item xs={12}>
                <Grid container direction="column">
                    <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    Rooms
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    Temperature
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    Humidity
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    Light
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    Pressure
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item></Grid>
                                    <Grid item sx={{ px: 4 }}></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 1.5 }} />
                <Grid container direction="column">
                    <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    Room 1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item></Grid>
                                    <Grid item>
                                        <GraphSection />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                            Connected
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 1.5 }} />
                <Grid container direction="column">
                    <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    Room 2
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item></Grid>
                                    <Grid item>
                                        <GraphSection />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2" sx={{ color: theme.palette.success.dark }}>
                            Connected
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 1.5 }} />
                <Grid container direction="column">
                    <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    Room 3
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item></Grid>
                                    <Grid item>
                                        <GraphSection />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2" sx={{ color: theme.palette.success.dark }}>
                            Connected
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 1.5 }} />
                <Grid container direction="column">
                    <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    Room 4
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item></Grid>
                                    <Grid item>
                                        <GraphSection />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2" sx={{ color: theme.palette.success.dark }}>
                            Connected
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 1.5 }} />
                <Grid container direction="column">
                    <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    Room 5
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    1
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item></Grid>
                                    <Grid item>
                                        <GraphSection />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2" sx={{ color: theme.palette.success.dark }}>
                            Connected
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Rooms;
