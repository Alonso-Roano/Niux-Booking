import Grafica from "./Grafica";
import "../styles/constructors/Grafica.css"
import GraficaLineChart from "./GraficaLine";
import GraficaSparklineChart from "./GraficaSpark";
import GraficaPieChart from "./GraficaPie";

function DashMenu({data, setOpcion}:any) {
    return(
        <div className="graficaContent">
            <h1>{data.name}</h1>
            <div className="dashGraficas">
            {data.graficas.map((grafica:any, index:any)=>{
                switch (grafica.type) {
                    case "bar": return <Grafica data={grafica} key={index} setOpcion={setOpcion}></Grafica>
                    case "line": return <GraficaLineChart data={grafica} key={index} setOpcion={setOpcion}></GraficaLineChart>
                    case "spark": return <GraficaSparklineChart data={grafica} key={index} setOpcion={setOpcion}></GraficaSparklineChart>
                    case "pie": return <GraficaPieChart data={grafica} key={index} setOpcion={setOpcion}></GraficaPieChart>
                    default: return <Grafica data={grafica} key={index} setOpcion={setOpcion}></Grafica>
                }
                
            })}
            </div>
        </div> 
    );    
}
export default DashMenu;