import DashMenu from "./dashMenu";
import DashCrud from "./DashCrud";

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