import { Card, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ApexCharts from 'apexcharts';
import { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

// material-ui
// third-party
// project imports
// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const HumidityLineAreaGraph = ({ chart }) => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const { navType } = customization;

    const orangeDark = '#009688';

    useEffect(() => {
        const newSupportChart = {
            ...chart.options,
            colors: [orangeDark],
            tooltip: {
                theme: 'light'
            }
        };
        ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
    }, [navType, orangeDark]);

    useEffect(() => {
        ApexCharts.exec(`support-chart`, 'updateOptions', chart);
    }, [chart]);

    return (
        <Card sx={{ bgcolor: '#e0f2f1' }}>
            <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" sx={{ color: '#004d40' }}>
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
            <Chart {...chart} />
        </Card>
    );
};

export default HumidityLineAreaGraph;
