import DashCrud from "./DashCrud";
import DashMenu from "./DashMenu";

function DashContent({ data, setOpcion }: any) {

  return (
    <>
      {data.name === "Dashboard" ? 
        <DashMenu data={data} setOpcion={setOpcion}></DashMenu>
      :
        <DashCrud data={data}></DashCrud>
      }
    </>

  );
}

export default DashContent;