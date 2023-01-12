// material-ui
import { useTheme } from '@emotion/react';
import { Divider, Grid, Typography } from '@mui/material';
import appService from 'api/services/app.service';
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
    const [rooms, setRooms] = useState(null);

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

    useEffect(() => {
        const getRooms = async () => {
            const rooms = await appService.getRooms();
            setRooms(rooms);
        };

        getRooms();
    }, []);

    console.log(rooms);

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

                {rooms?.map((item) => (
                    <div key={item.room.room_name}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="subtitle1" color="inherit">
                                            {item.room.room_name}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1" color="inherit">
                                            {item.room.temperature}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1" color="inherit">
                                            {item.room.humidity}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1" color="inherit">
                                            {item.room.light}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1" color="inherit">
                                            {item.room.pressure / 1000}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item></Grid>
                                            <Grid item>
                                                <GraphSection roomName={item.room.room_name} />
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
                    </div>
                ))}
            </Grid>
        </MainCard>
    );
};

export default Rooms;
