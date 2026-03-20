import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = ({ data: revenueData }) => {
    // Fallback data if no data is provided
    const defaultData = [500, 700, 300, 600, 750, 900, 650, 870, 960, 1020, 1100, 1150];
    const chartData = revenueData && revenueData.length > 0 ? revenueData : defaultData;

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Revenue (USD)',
                data: chartData,
                backgroundColor: 'rgba(99, 102, 241, 0.7)', // Primary color
                borderColor: 'rgba(99, 102, 241, 1)',
                borderWidth: 0,
                borderRadius: 8,
                barThickness: 12,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 12 },
                cornerRadius: 8,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#f1f5f9',
                    drawBorder: false,
                },
                ticks: {
                    color: '#94a3b8',
                    font: { size: 10, weight: '600' }
                }
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: '#94a3b8',
                    font: { size: 10, weight: '600' }
                }
            }
        },
    };

    return (
        <div className="w-full h-full">
            <Bar data={data} options={options} />
        </div>
    );
};

export default RevenueChart;