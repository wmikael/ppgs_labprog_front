import { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';

export default function StackedBar({data, anoIni, anoFim}) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const labels = [];
        for(let i = anoFim; i >= anoIni; i--) {
            labels.push(i.toString());
        }

        const datasets = [
            {
                type: 'bar',
                label: 'A1',
                backgroundColor: '#4dc9f6',
                data: data[0],
            },
            {
                type: 'bar',
                label: 'A2',
                backgroundColor: '#f67019',
                data: data[1],
            },
            {
                type: 'bar',
                label: 'A3',
                backgroundColor: '#537bc4',
                data: data[2],
            },
            {
                type: 'bar',
                label: 'A4',
                backgroundColor: '#acc236',
                data: data[3],
            },
        ];

        const chartData = {
            labels,
            datasets,
        };

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                legend: {
                    labels: {
                        color: '--text-color',
                    },
                },
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: '--text-color-secondary',
                    },
                    grid: {
                        color: '--surface-border',
                    },
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: '--text-color-secondary',
                    },
                    grid: {
                        color: '--surface-border',
                    },
                },
            },
        };

        setChartData(chartData);
        setChartOptions(options);
    }, [data, anoIni, anoFim]);

    return (
        <div className="card">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    );
}
