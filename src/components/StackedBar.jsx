
import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function StackedBar() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['2023', '2022', '2021', '2020', '2019'],
            datasets: [
              {
                type: 'bar',
                label: 'A1',
                backgroundColor: '#4dc9f6',
                data: [9, 33, 30, 26, 17],
              },
              {
                type: 'bar',
                label: 'A2',
                backgroundColor: '#f67019',
                data: [0, 8, 13, 17, 6],
              },
              {
                type: 'bar',
                label: 'A3',
                backgroundColor: '#537bc4',
                data: [12, 26, 24, 46, 20],
              },
              {
                type: 'bar',
                label: 'A4',
                backgroundColor: '#acc236',
                data: [0, 30, 49, 25, 55],
              },
            ],
          };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}
        