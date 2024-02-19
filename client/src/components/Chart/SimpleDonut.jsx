/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const SimpleDonut = () => {
  const [chartData, setChartData] = useState({
    options: {
      labels: ['Vidrio', 'Aluminio', 'Carton'],
      legend: {
        show: false,
      },
    },
    series: [44, 55, 41],
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'top',
        },
      },
      pie: {
        expandOnClick: false,
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#333'],
        },
      },
    },
  });

  return (
    <div className="donut">
      <Chart options={chartData.options} series={chartData.series} type="donut" width="200" />
    </div>
  );
};

export default SimpleDonut;
