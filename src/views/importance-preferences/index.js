// material-ui
import { Button, Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';

// project imports
// ==============================|| SAMPLE PAGE ||============================== //

const ImportancePreferences = () => {
    const importanceInit = {
        'temperature, pressure': [-9, 9],
        'temperature, humidity': [-9, 9],
        'temperature, light': [-9, 9],
        'pressure, humidity': [-9, 9],
        'pressure, light': [-9, 9],
        'humidity, light': [-9, 9]
    };
    const [importance, setImportance] = useState(importanceInit);

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
        <MainCard title="Importance Preferences">
            <Box marginBottom={4}>
                <Typography variant="h4" marginBottom={1}>
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
                <Typography variant="h4" marginBottom={1}>
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
                <Typography variant="h4" marginBottom={1}>
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
                <Typography variant="h4" marginBottom={1}>
                    Pressure - Humidity
                </Typography>
                <Slider
                    getAriaLabel={() => 'Pressure Humidity Importance'}
                    value={importance['pressure, humidity']}
                    onChange={(_, newValue) => handleImportanceChange('pressure, humidity', newValue)}
                    valueLabelDisplay="auto"
                    min={-9}
                    max={9}
                />
            </Box>
            <Box marginBottom={4}>
                <Typography variant="h4" marginBottom={1}>
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
                <Typography variant="h4">Humidity - Light</Typography>
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
                <Button variant="contained" onClick={handleImportanceSave}>
                    Save
                </Button>
            </Box>
        </MainCard>
    );
};

export default ImportancePreferences;
