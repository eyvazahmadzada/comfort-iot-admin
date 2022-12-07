// material-ui
import { Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';

// project imports
// ==============================|| SAMPLE PAGE ||============================== //

function valuetext(value) {
    return `${value}°C`;
}

const ImportancePreferences = () => {
    const [value, setValue] = React.useState([0, 0]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MainCard title="Importance Preferences">
            <Box marginBottom={4}>
                <Typography variant="h4" marginBottom={1}>
                    Temperature - Pressure
                </Typography>
                <Slider
                    getAriaLabel={() => 'Temperature Pressure Importance'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
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
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
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
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
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
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
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
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={-9}
                    max={9}
                />
            </Box>
            <Box>
                <Typography variant="h4">Humidity - Light</Typography>
                <Slider
                    getAriaLabel={() => 'Humidity Light Importance'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={-9}
                    max={9}
                />
            </Box>
        </MainCard>
    );
};

export default ImportancePreferences;
