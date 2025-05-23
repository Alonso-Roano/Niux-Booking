import { BarChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';
import Requests from '@admin/functions/Requests';
import pureData from '@admin/json/dashboardAdmin.json'
import Utils from '@admin/functions/Utils';

function GraficaAdmin({ data, setOpcion }: any) {
  const [datos, setDatos] = useState<any>(false);
  const [objeto, setObjeto] = useState<any>(false);
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
    if(datos){
      const tipo = datos.data[data["tipo"]];
      let suma=0;
      tipo.forEach((element:any) => {
        suma = suma+element[data["total"]]
      });
      setObjeto(suma);
    }
  }, [datos]);

  useEffect(() => {
    Requests.Get(`Estadisticas/GetDatosDashboard`, setDatos);
  }, []);

  const processDataForChart = (carts: any[]) => {
    return {
      xAxisData: carts.slice(-data.numeroBarras).map((cart: any) => Utils.formatDate(cart.fecha)),
      seriesData: carts.slice(-data.numeroBarras).map((cart: any) => cart[data["total"]]),
    };
  };

  const chartData = datos ? processDataForChart(datos.data[data["tipo"]]) : { xAxisData: [], seriesData: [] };

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
      {datos && <h3>{objeto}</h3>}
      {datos ? (
        chartData.seriesData.length > 0 ? (
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
        ) : (
          <div className='noData'><p>Datos aún no agregados</p></div>
          
        )
      ) : (
        <div className='loaderContent'>
          <div className='loader'></div>
        </div>
      )}
    </article>
  );
}

export default GraficaAdmin;
