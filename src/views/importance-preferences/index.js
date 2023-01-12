// material-ui
import { Button, Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import appService from 'api/services/app.service';
import Decimal from 'decimal.js';
import React, { useEffect } from 'react';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';

const Fraction = require('fractional').Fraction;

// project imports
// ==============================|| SAMPLE PAGE ||============================== //

const ImportancePreferences = () => {
    const [importance, setImportance] = useState(null);

    const handleImportanceChange = (key, newValue) => {
        // Disable change on some situations
        if (newValue.includes(0) || newValue[0] > 0 || newValue[1] < 0) return false;

        setImportance({ ...importance, [key]: newValue });
    };

    const handleImportanceSave = async () => {
        let importanceServerData = {};
        for (const key of Object.keys(importance)) {
            const value = importance[key];
            importanceServerData[key] = Math.abs(value[0] / value[1]);
        }

        const data = new FormData();
        data.append('data', JSON.stringify(importanceServerData));
        const res = await appService.updateAHPImportance(data);
        console.log(res);
    };

    useEffect(() => {
        const getImportance = async () => {
            const importanceData = await appService.getAHPImportance();
            const updatedImportanceData = {};
            Object.keys(importanceData).map((key) => {
                const fraction = new Decimal(importanceData[key].toFixed(1)).toFraction();

                updatedImportanceData[key] = [-fraction[0].d[0], fraction[1].d[0]];
            });
            setImportance(updatedImportanceData);
        };

        getImportance();
    }, []);

    return (
        importance && (
            <MainCard title="Importance Preferences">
                <Box marginBottom={4}>
                    <Typography constiant="h4" marginBottom={1}>
                        Temperature - Pressure
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'Temperature Pressure Importance'}
                        value={importance['temperature, pressure']}
                        onChange={(_, newValue) => handleImportanceChange('temperature, pressure', newValue)}
                        valueLabelDisplay="auto"
                        min={-9}
                        max={9}
                    />
                </Box>
                <Box marginBottom={4}>
                    <Typography constiant="h4" marginBottom={1}>
                        Temperature - Humidity
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'Temperature Humidity Importance'}
                        value={importance['temperature, humidity']}
                        onChange={(_, newValue) => handleImportanceChange('temperature, humidity', newValue)}
                        valueLabelDisplay="auto"
                        min={-9}
                        max={9}
                    />
                </Box>
                <Box marginBottom={4}>
                    <Typography constiant="h4" marginBottom={1}>
                        Temperature - Light
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'Temperature Light Importance'}
                        value={importance['temperature, light']}
                        onChange={(_, newValue) => handleImportanceChange('temperature, light', newValue)}
                        valueLabelDisplay="auto"
                        min={-9}
                        max={9}
                    />
                </Box>
                <Box marginBottom={4}>
                    <Typography constiant="h4" marginBottom={1}>
                        Pressure - Humidity
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'Humidity Pressure Importance'}
                        value={importance['humidity, pressure']}
                        onChange={(_, newValue) => handleImportanceChange('pressure, humidity', newValue)}
                        valueLabelDisplay="auto"
                        min={-9}
                        max={9}
                    />
                </Box>
                <Box marginBottom={4}>
                    <Typography constiant="h4" marginBottom={1}>
                        Pressure - Light
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'Pressure Light Importance'}
                        value={importance['pressure, light']}
                        onChange={(_, newValue) => handleImportanceChange('pressure, light', newValue)}
                        valueLabelDisplay="auto"
                        min={-9}
                        max={9}
                    />
                </Box>
                <Box>
                    <Typography constiant="h4">Humidity - Light</Typography>
                    <Slider
                        getAriaLabel={() => 'Humidity Light Importance'}
                        value={importance['humidity, light']}
                        onChange={(_, newValue) => handleImportanceChange('humidity, light', newValue)}
                        valueLabelDisplay="auto"
                        min={-9}
                        max={9}
                    />
                </Box>

                <Box textAlign="center">
                    <Button constiant="contained" onClick={handleImportanceSave}>
                        Save
                    </Button>
                </Box>
            </MainCard>
        )
    );
};

export default ImportancePreferences;
