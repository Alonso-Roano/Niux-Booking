import { BarChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';
import Requests from '../functions/Requests';
import pureData from '../json/dashboardEmpresa.json'

function Grafica({ data, setOpcion }: any) {
  const [datos, setDatos] = useState<any>(false);

  useEffect(() => {
    Requests.Get(data.url, setDatos);
  }, []);

  const processDataForChart = (carts: any[]) => {
    return {
      xAxisData: carts.slice(-10).map((cart: any) => cart.id),
      seriesData: carts.slice(-10).map((cart: any) => cart.totalProducts),
    };
  };

  const chartData = datos ? processDataForChart(datos.carts) : { xAxisData: [], seriesData: [] };

  const colors = ['#02b2af', '#2e96ff', '#8FBCFF', '#7B6FCC', '#b800d8'];

  const handleClick = () => {
    const opcion = data.opcion;
    
    if (opcion in pureData) {
      setOpcion(pureData[opcion as keyof typeof pureData]);
    } else {
      console.error(`Opción no válida: ${opcion}`);
    }
  };

  return (
    <article className="cardGrafica" onClick={handleClick}>
      <h2>{data.name}</h2>
      {datos && <h3>{datos.total}</h3>}
      {datos ? (
        <BarChart
          series={[
            {
              data: chartData.seriesData,
              type: 'bar',
            },
          ]}
          height={200}
          xAxis={[
            {
              data: chartData.xAxisData,
              scaleType: 'band',
              colorMap: {
                type: 'ordinal',
                colors: colors,
              },
            },
          ]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      ):<div className='loaderContent'><div className='loader'></div></div>}
    </article>
  );
}

export default Grafica;
