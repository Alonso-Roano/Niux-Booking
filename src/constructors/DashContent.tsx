import DashCrud from "./DashCrud";
import DashMenu from "./DashMenu";
import DashMenuAdmin from "./DashMenuAdmin";

function DashContent({ data, setOpcion }: any) {

  return (
    <>
      {data.name === "Dashboard" ? 
        <DashMenu data={data} setOpcion={setOpcion}></DashMenu>
      :
      data.name === "Dashboard Admin" ? 
        <DashMenuAdmin data={data} setOpcion={setOpcion}></DashMenuAdmin> 
        :
        <DashCrud data={data}></DashCrud>
      }
    </>

  );
}

export default DashContent;