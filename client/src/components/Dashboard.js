import { useState, useEffect, Fragment } from 'react';
import PlatformService from '../api/PlatformService';
import { useFilesStore } from '../store';
import {CircularProgress, Box, Typography, Button } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { parseDate, parseMoneyString } from '../utils/files';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Formats revenue line items
const getLineItems = (insights = []) => {
    return insights?.map(i => ({
        deals_total: i.deals_total,
        date: parseDate(i.created_at),
    }));
}

// Insights dashboard
function Dashboard() {
    const filesStore = useFilesStore();

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [revenueData, setRevenueData] = useState({});

    // Fetch from the insights endpoint
    useEffect(() => {
        (async () => {
            if (isLoading && !filesStore.insights.length) {
                try {
                    // API request for insights
                    const { data } = await PlatformService.get('/files/insights');
                    // Persist to global store (hard refresh provided)
                    filesStore.setInsights(data.data || []);
                    // Turn off loading state
                    setIsLoading(false);
                } catch (error) {
                    setIsLoading(false);
                    setError(error);
                    alert(error);
                }
            } else {
                setIsLoading(false);
            }
        })();
    }, [filesStore, isLoading]);

    // Bar chart config
    useEffect(() => {
        // Relate line item values the chart needs
        const lineItems = getLineItems(filesStore?.insights);
        // Set revenue data to state, organized by date
        setRevenueData({
            labels: lineItems.map(li => li.date),
            datasets: [
                {
                    label: 'USD',
                    data: lineItems.map(li => parseMoneyString(li.deals_total)),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        });
    }, [filesStore]);

    // Hard-refresh of page & data
    const handlePageRefresh = () => {
        window.location.assign('/');
    };

    if (error) {
        return (
            <Typography variant="subtitle1" style={{ padding: '20px 0'}}>Insights could not be fetched.</Typography>
        );
    }

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Fragment>
            <div>
                <Bar
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Revenue By Upload Date',
                            },
                        },
                    }}
                    data={revenueData}
                />
                <Button onClick={handlePageRefresh}>Refresh</Button>
            </div>
        </Fragment>
    );
}

export default Dashboard;
