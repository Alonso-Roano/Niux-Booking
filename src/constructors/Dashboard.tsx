import { useState } from "react";

import DashContent from "./DashContent";
import Tooltips from "./Tooltip";
import Tables from "./Tables";
type DataProps = {
    data: any;
};
  
function Dashboard({data}:DataProps) {
  const [opcion, setOpcion] = useState(data.props[0]);
  
  return <>
  {data.props.map((prop:any, index:number) => <button onClick={() => setOpcion(prop)} key={index}>{prop}</button>)}
  <DashContent data={opcion}/>
  <Tooltips></Tooltips>
  </>;
}

export default Dashboard;
