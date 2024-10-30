import { useState } from "react";

import DashContent from "./DashContent";
type DataProps = {
    data: any;
};
  
function Dashboard({data}:DataProps) {
  const [opcion, setOpcion] = useState(data.props[0]);
  
  return <>
  {data.props.map((prop:any) => <button onClick={() => setOpcion(prop)}>{prop}</button>)}
  <DashContent data={opcion}/>
  </>;
}

export default Dashboard;
