import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import appService from 'api/services/app.service';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';

import chartData from './chart-data/total-growth-bar-chart';

// material-ui
// third-party
// project imports
// chart data
const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading }) => {
    const [averageValues, setAverageValues] = useState(null);
    const [chartDataMain, setChartDataMain] = useState(null);
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

    const { navType } = customization;
    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const grey500 = theme.palette.grey[500];

    const primary200 = theme.palette.primary[200];
    const primaryDark = theme.palette.primary.dark;
    const secondaryMain = theme.palette.secondary.main;
    const secondaryLight = theme.palette.secondary.light;

    useEffect(() => {
        const getAverageValues = async () => {
            const averageValues = await appService.getAverageValues();
            setAverageValues(averageValues);
        };

        getAverageValues();
    }, []);

    useEffect(() => {
        if (averageValues) {
            const updatedChartData = { ...chartData };
            updatedChartData.options.xaxis.categories = Object.keys(averageValues);
            updatedChartData.series = [
                { name: 'Pressure kPa', data: Object.values(averageValues).map((item) => item.pressure / 1000) },
                { name: 'Temperature °C', data: Object.values(averageValues).map((item) => item.temperature) },
                { name: 'Humidity ', data: Object.values(averageValues).map((item) => item.humidity) },
                { name: 'Light', data: Object.values(averageValues).map((item) => item.light) }
            ];

            setChartDataMain(updatedChartData);
        }
    }, [averageValues]);

    useEffect(() => {
        if (chartDataMain) {
            const newChartData = {
                ...chartData.options,
                colors: [secondaryMain, primary200, primaryDark, secondaryLight],
                xaxis: {
                    labels: {
                        style: {
                            colors: [primary, primary, primary, primary]
                        }
                    }
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: [primary, primary, primary, primary]
                        },
                        formatter: (value) => (+value).toFixed(1)
                    }
                },
                grid: {
                    borderColor: grey200
                },
                tooltip: {
                    theme: 'light'
                },
                legend: {
                    labels: {
                        colors: grey500
                    }
                }
            };

            // do not load chart when loading
            if (!isLoading) {
                ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
            }
        }
    }, [chartDataMain, navType, primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500]);

    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Number of rooms</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h3">4</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {chartDataMain && <Chart {...chartDataMain} />}
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

TotalGrowthBarChart.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
