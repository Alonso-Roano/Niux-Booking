import "../styles/constructors/Grafica.css"
import GraficaPieChart from "./GraficaPie";
import GraficaAdmin from "./GraficaAdmin";
import GraficaLineChartAdmin from "./GraficaLineAdmin";
import GraficaSparklineChartAdmin from "./GraficaSparkAdmin";

function DashMenuAdmin({data, setOpcion}:any) {
    return(
        <div className="graficaContent">
            <h1>{data.name}</h1>
            <div className="dashGraficasAdmin">
            {data.graficas.map((grafica:any, index:any)=>{
                switch (grafica.type) {
                    case "bar": return <GraficaAdmin data={grafica} key={index} setOpcion={setOpcion}></GraficaAdmin>
                    case "line": return <GraficaLineChartAdmin data={grafica} key={index} setOpcion={setOpcion}></GraficaLineChartAdmin>
                    case "spark": return <GraficaSparklineChartAdmin data={grafica} key={index} setOpcion={setOpcion}></GraficaSparklineChartAdmin>
                    case "pie": return <GraficaPieChart data={grafica} key={index} setOpcion={setOpcion}></GraficaPieChart>
                    default: return <GraficaAdmin data={grafica} key={index} setOpcion={setOpcion}></GraficaAdmin>
                }
                
            })}
            </div>
        </div> 
    );    
}
export default DashMenuAdmin;