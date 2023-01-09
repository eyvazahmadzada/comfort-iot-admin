import { Card, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ApexCharts from 'apexcharts';
import { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

import chartData from '../chart-data/line-area-chart';

// material-ui
// third-party
// project imports
// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const TemperatureLineAreaGraph = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const { navType } = customization;

    const orangeDark = theme.palette.primary[800];

    useEffect(() => {
        const newSupportChart = {
            ...chartData.options,
            colors: [orangeDark],
            tooltip: {
                theme: 'light'
            }
        };
        ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
    }, [navType, orangeDark]);

    return (
        <Card sx={{ bgcolor: 'primary.light' }}>
            <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.primary.dark }}>
                                Last 24h
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ color: theme.palette.grey[800] }}>
                        .
                    </Typography>
                </Grid>
            </Grid>
            <Chart {...chartData} />
        </Card>
    );
};

export default TemperatureLineAreaGraph;
