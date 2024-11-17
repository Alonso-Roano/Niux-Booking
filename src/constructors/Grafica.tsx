import { BarChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';
import Requests from '../functions/Requests';
import pureData from '../json/dashboardEmpresa.json'

function Grafica({ data, setOpcion }: any) {
  const [datos, setDatos] = useState<any>(false);
  const [shadow, setShadow] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const offsetX = (x - rect.width / 2) / 18;
    const offsetY = (y - rect.height / 2) / 18;

    setShadow({ x: -offsetX, y: -offsetY });
  };

  const handleMouseLeave = () => {
    setShadow({ x: 0, y: 0 });
  };

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
    <article 
        className="cardGrafica" 
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
            boxShadow: `${shadow.x}px ${shadow.y}px 7px rgba(0, 0, 0, 0.2)`,
            transition: "box-shadow 0.2s ease",
        }}
    >
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
