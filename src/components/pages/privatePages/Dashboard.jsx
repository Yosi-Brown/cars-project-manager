import React from 'react';
import { Pie, Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, LineElement, BarElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import useFetch from '../../../hooks/useFetch';

ChartJS.register(Title, Tooltip, Legend, ArcElement, LineElement, BarElement, CategoryScale, LinearScale, PointElement);

const url = import.meta.env.VITE_URL;

// רשימת צבעים ל-15 קטגוריות
const colors = [
  '#FF6384', '#36A2EB', '#FFCE56', '#8A2BE2', '#FF4500',
  '#008080', '#FFD700', '#00FF00', '#0000FF', '#800080',
  '#FF00FF', '#00CED1', '#DC143C', '#7FFF00', '#FFDAB9'
];

// רכיב עזר להצגת גרף עוגה
const ChartComponent = ({ title, type, data }) => {
  const categoryCounts = data.reduce((acc, product) => {
    const category = product.category.name;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category]++;
    return acc;
  }, {});

  const categories = Object.keys(categoryCounts);
  const counts = Object.values(categoryCounts);

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: title,
        data: counts,
        backgroundColor: colors.slice(0, categories.length),
        borderColor: colors.slice(0, categories.length),
        borderWidth: 1,
        fill: true
      },
    ],
  };

  let ChartType;
  switch (type) {
    case 'pie':
      ChartType = Pie;
      break;
    case 'line':
      ChartType = Line;
      break;
    case 'bar':
      ChartType = Bar;
      break;
    case 'doughnut':
      ChartType = Doughnut;
      break;
    default:
      ChartType = Pie;
  }

  return (
    <div className='chart-container p-4 bg-white rounded-lg shadow-lg'>
      <h3 className='text-center mb-2'>{title}</h3>
      <ChartType data={chartData} />
    </div>
  );
};

function Dashboard() {
  const [data, isLoading, isError] = useFetch(`${url}/products/getall`);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data || !data.products) {
    return <div>Error loading data</div>;
  }

  return (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 justify-center items-center h-screen dark:bg-gray-700 dark:text-gray-400">
  <div className='max-w-xs'>
    <ChartComponent title="Pie Chart" type="pie" data={data.products} />
  </div>
  <div className='max-w-xs'>
    <ChartComponent title="Doughnut Chart" type="doughnut" data={data.products} />
  </div>
  <div className='max-w-xs'>
    <ChartComponent title="Line Chart" type="line" data={data.products} />
  </div>
  <div className='max-w-xs'>
    <ChartComponent title="Bar Chart" type="bar" data={data.products} />
  </div>
</div>

  );
}

export default Dashboard;
