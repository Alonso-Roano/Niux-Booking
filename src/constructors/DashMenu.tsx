import Grafica from "./Grafica";
import "../styles/constructors/Grafica.css"

function DashMenu({data, setOpcion}:any) {
    return(
        <div className="graficaContent">
            <h1>{data.name}</h1>
            <div className="dashGraficas">
            {data.graficas.map((grafica:any, index:any)=><Grafica data={grafica} key={index} setOpcion={setOpcion}></Grafica>)}
            </div>
        </div> 
    );    
}
export default DashMenu;