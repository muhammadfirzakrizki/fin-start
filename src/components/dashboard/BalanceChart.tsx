import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

export function BalanceChart() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-full h-[300px] flex items-center justify-center text-gray-500">Loading chart...</div>;
  }

  const options = {
    chart: {
      type: 'area' as const,
      toolbar: { show: false },
      background: 'transparent',
      fontFamily: 'Outfit, sans-serif',
    },
    colors: ['#10b981'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 100]
      }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' as const, width: 3 },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: '#9ca3af' }
      }
    },
    yaxis: {
      labels: {
        style: { colors: '#9ca3af' },
        formatter: (value: number) => `Rp ${(value / 1000000).toFixed(1)}M`
      }
    },
    grid: {
      borderColor: 'rgba(255,255,255,0.05)',
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } }
    },
    theme: { mode: 'dark' as const }
  };

  const series = [
    {
      name: 'Balance',
      data: [12000000, 15000000, 14000000, 18000000, 16000000, 22000000, 25000000]
    }
  ];

  return (
    <div className="w-full h-full min-h-[300px]">
      <Chart options={options} series={series} type="area" height="100%" />
    </div>
  );
}
